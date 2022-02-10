import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore,storage } from "../../shared/firebase";
import { collection, doc, getDoc, deleteDoc,orderBy,getDocs,limit, setDoc,addDoc,updateDoc, query,startAfter } from "firebase/firestore";
import { ref,uploadString,getDownloadURL } from "firebase/storage";
import moment from "moment"

import { actionCreators as imageActions } from "./image";

const EDIT_LIKE = "EDIT_LIKE"
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";
const DELETE = "DELETE";


const editLike =createAction(EDIT_LIKE, (post_id,post_like) => ({post_id,post_like}));
const setPost = createAction(SET_POST, (post_list,paging) => ({post_list,paging}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id,post) => ({post_id,post}));
const loading = createAction(LOADING, (is_loading) => ({is_loading}))
const delPost = createAction(DELETE,(post_index)=>({post_index}));
                                                                                                                                                                                                                                                                                                                                                                                                       
const initialState = {
    list: [],
    paging:{start:null,next: null,size:3},
    is_loading: false,
}

// 게시글 하나에는 어떤 정보가 있어야 하는 지 하나 만들어둡시다! :)
const initialPost = {
  // id: 0,
  // user_info: {
	
  //   user_name: "mean0",
  //   user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  // },
  image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfSozchojvNgOjInEW98n570p70OopLGJJgQ&usqp=CAU",
  contents: "",
  comment_cnt: 5,
  insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
  like:[]
};
const LikeFB = (post_id, user_id)=>{
  return  function(dispatch, getState, {history}){
    if(!post_id)
    {
      console.log("게시물 정보 앖음")
      return;
    }
    let is_like=false
    const _post_idx = getState().post.list.findIndex(p=>p.id ===post_id);
    const _post = getState().post.list[_post_idx];
   const _post_like = _post.like
   _post_like.map((c,idx)=>{
  
      if(c === user_id){
          is_like= true;
      } 
  })
  if(is_like){
    const idx = _post.like.findIndex((p)=> p ===user_id);
   const post_like =_post_like.filter((l, i) => {return idx !== i;})
    console.log("_post.like",_post.like) 
   console.log("post_like",post_like)

  const postDB = doc(firestore,"post",post_id);
     updateDoc(postDB,{like : post_like});
   dispatch(editLike(post_id,post_like));
  }else{
    const post_like = [..._post_like,user_id]
     console.log("post_like",post_like)

    const postDB = doc(firestore,"post",post_id);
     updateDoc(postDB,{like : post_like});
    dispatch(editLike(post_id,post_like));
    }
  }
}
const editPostFB=(post_id=null, post = {})=>{
  return async function (dispatch, getState, {history}){

    if(!post_id)
    {
      console.log("게시물 정보 앖음")
      return;
    }
    
    const _image=getState().image.preview;
    
    const _post_idx = getState().post.list.findIndex(p=>p.id ===post_id);
    const _post = getState().post.list[_post_idx];
  
    if(_image === _post.image_url){
      const postDB = doc(firestore,"post",post_id);
      await updateDoc(postDB,post);
      dispatch(editPost(post_id,{...post}));
      history.replace("/");
      return;
    }else{
      const user_id = getState().user.user.uid;
      const _upload = ref(storage, `images/${user_id}_${new Date().getTime()}`);
          uploadString(_upload, _image, 'data_url').then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
            console.log(url);

            return url;
         })
         .then(url => {
            const postDB = doc(firestore, "post", post_id);
            updateDoc(postDB, {...post,image_url: url});
            dispatch(editPost(post_id, {  ...post, image_url: url }));
            history.replace("/");

            dispatch(imageActions.setPreview(null));
          });
    });

    }
    
  }
}

const addPostFB = (contents="",post_posi)=>{
  return async function (dispatch, getState,{history}){
    
    const _user = getState().user.user;

    const user_info={
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile
    }

    const _post = {
      ...initialPost,
      contents : contents,
      post_posi: post_posi,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    const _image= getState().image.preview;
    console.log(_image)
    const _upload = ref(storage, `images/${user_info.user_id}_${new Date().getTime()}`);
    uploadString(_upload,_image,'data_url').then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);

        return url;
      }).then(url =>{
        const postDB = addDoc(collection(firestore,"post"),{...user_info,..._post,image_url:url})
        let post = {user_info,..._post, id:postDB.id, image_url:url};
        dispatch(addPost(post));
        history.replace("/");

        dispatch(imageActions.setPreview(null));
      });
    });

    return;
    
    // let post={user_info,..._post, id:_}
//    dispatch(addPost());
  }
}

const getPostFB=(start=null,size=3)=>{
    return async function (dispatch, getState,{history}){

      let _paging = getState().post.paging;
      if(_paging.start && !_paging.next){
        return;
      }


      dispatch(loading(true));
      const postDB = collection(firestore,"post")
       // const postDB = await getDocs(collection(firestore,"post"))
        let q=await getDocs(query(postDB,orderBy("insert_dt","desc"),limit(size + 1)));


        if(start){
          q=await getDocs(query(postDB,orderBy("insert_dt","desc"),startAfter(start),limit(size + 1)));
        }

        let post_list = [];

        let paging ={
          start : q.docs[0],
          next :q.docs.length ===size+1? q.docs[q.docs.length=1]:null,
          size:size,
        }
        console.log("paging",paging)
        q.forEach((doc) => {
          let _post = doc.data();
  
          // ['commenct_cnt', 'contents', ..]
          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );
  
          post_list.push(post);
       });
        post_list.pop();
        dispatch(setPost(post_list,paging));
      ;
    }
}
const getOnePostFB = (id) => {
  return async function (dispatch, getState, { history }) {
    const postDB = await getDoc(doc(firestore, "post", id));
    let _post = postDB.data();
    let post = Object.keys(_post).reduce(
      (acc, cur) => {
        if (cur.indexOf("user_") !== -1) {
          return {
            ...acc,
            user_info: { ...acc.user_info, [cur]: _post[cur] },
          };
        }
        return { ...acc, [cur]: _post[cur] };
      },
      { id: doc.id, user_info: {} }
    );
    dispatch(setPost([post]))
  }
}
const delPostFB=(post_id)=>{
  return async function (dispatch, getState){
    if(!post_id){
      window.alert("게시물 정보 앖음");
      return;
    }
    const docRef = doc(firestore, "post",post_id);
    await deleteDoc(docRef);
    const _post_list = getState().post.list;    
    const post_index = _post_list.findIndex((b)=>{
      return b.id === post_id;
      
    });
    console.log("memo_index",post_index)
    dispatch(delPost(post_index));
  }
}

// reducer
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
          draft.list.push(...action.payload.post_list);

           // post_id가 같은 중복 항목을 제거합시다! :)
        draft.list = draft.list.reduce((acc, cur) => {
          // findIndex로 누산값(cur)에 현재값이 이미 들어있나 확인해요!
          // 있으면? 덮어쓰고, 없으면? 넣어주기!
          if (acc.findIndex((a) => a.id === cur.id) === -1){
            return [...acc, cur];
          }else{
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);

				// paging이 있을 때만 넣기
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.is_loading = false;
      }),
  
        [ADD_POST]: (state, action) => produce(state, (draft) => {
          draft.list.unshift(action.payload.post);
        }),
        [EDIT_POST]: (state, action) => produce(state, (draft) => {
         let idx = draft.list.findIndex((p)=> p.id===action.payload.post_id);
            console.log("에딧",action.payload.post_id)
         draft.list[idx]={...draft.list[idx], ...action.payload.post};
        }),
        [LOADING]: (state, action) => produce(state, (draft) => {
          draft.is_loading = action.payload.is_loading
        }),
        [DELETE]: (state, action) => produce(state, (draft) => {
          draft.list =state.list.filter((l, idx) => {
            return parseInt(action.payload.post_index) !== idx;
          })
        }),
        [EDIT_LIKE]: (state, action) => produce(state, (draft) => {
          let idx = draft.list.findIndex((p)=> p.id===action.payload.post_id);
           draft.list[idx].like=action.payload.post_like
         })
    },
    initialState
  );

  // action creator export
const actionCreators = {
    setPost,
    addPost,
    editPost,
    getPostFB,
    addPostFB,
    editPostFB,
    getOnePostFB,
    delPostFB,
    LikeFB,
  };
  
  export { actionCreators };