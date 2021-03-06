import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import { collection,orderBy,getDocs,query,where,getFirestore } from "firebase/firestore";
import "moment";
import moment from "moment";


const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({post_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const getCommentFB = (post_id = null) => {
    return async function (dispatch, getState, { history }) {
      
          // post_id가 없으면 바로 리턴하기!
      if(!post_id){
          return;
      }
      const q = query(collection(firestore, "comment"), where("post_id", "==", post_id),orderBy("insert_dt", "desc"));
  
  const commentDB = await getDocs(q);
      // where로 게시글 id가 같은 걸 찾고,
      // orderBy로 정렬해줍니다.
      
          let list = [];
          commentDB.forEach((doc) => {
            list.push({ ...doc.data(), id: doc.id });
          });
          //   가져온 데이터를 넣어주자!
          dispatch(setComment(post_id, list));
        
    };
  };

  // const addCommentFB = (post_id, contents) => {
  //   return function (dispatch, getState, { history }) {
  //     const commentDB = collection(firestore, "comment");
  //     const user_info = getState().user.user;
  
  //     let comment = {
  //       post_id: post_id,
  //       user_id: user_info.uid,
  //       user_name: user_info.user_name,
  //       user_profile: user_info.user_profile,
  //       contents: contents,
  //       insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
  //     };
  
  //     // firestore에 코멘트 정보를 넣어요!
  //     commentDB.add(comment).then((doc) => {
  //       const postDB = collection(firestore, "post");
  //       comment = { ...comment, id: doc.id };
  
  //       const post = getState().post.list.find((l) => l.id === post_id);
  
  //       //   firestore에 저장된 값을 +1해줍니다!
  //       const increment = firebase.firestore.FieldValue.increment(1);
        
  //       // post에도 comment_cnt를 하나 플러스 해줍니다.
  //       postDB
  //         .doc(post_id)
  //         .update({ comment_cnt: increment })
  //         .then((_post) => {
  //           dispatch(addComment(post_id, comment));
  //           // 리덕스에 post가 있을 때만 post의 comment_cnt를 +1해줍니다.
  //           if (post) {
  //             dispatch(
  //               postActions.editPost(post_id, {
  //                 comment_cnt: parseInt(post.comment_cnt) + 1,
  //               })
  //             );
  //           }
  //         });
  //     });
  //   };
  // };
export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
    produce(state, (draft) => {
      // comment는 딕셔너리 구조로 만들어서,
      // post_id로 나눠 보관합시다! (각각 게시글 방을 만들어준다고 생각하면 구조 이해가 쉬워요.)
      draft.list[action.payload.post_id] = action.payload.comment_list;
    }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {

      }),
      [LOADING]: (state, action) => 
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      })
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
};

export { actionCreators };