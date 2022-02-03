
// bucket.js
import {db} from "../../firebase"; //파이어베이스에서 db불러오기
import { 
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc
  } from "firebase/firestore";

// Actions
const LOAD = "memo/LOAD";// 값을 불러오는 액션
const CREATE = "memo/CREATE";// 값을 만드는 액션
const UPDATE = "memo/UPDATE";// 완료 버튼 클릭 시 completed를 true값으로 바꿔주는 액션
const DELETE = "memo/DELETE";// 삭제 버튼 클릭 시 
const UPDATEM = "memo/UPDATEM";// 수정 시 값을 바꿔주는 액션
const initialState = {
  list: [
    { title: "영화관 가기1", name: "박현석", desc: "그는 신인가", completed: false },
    
  ],
};

// Action Creators
export function loadBucket(memo_list){
  console.log("로드 액션을 생성할거야!");//함수에서 받은 파라미터를 가지고 위에서 선언한 액션으로 이동
  return{type : LOAD,memo_list}
}
export function createBucket(memo){
  console.log("만들기 액션을 생성할거야!");//함수에서 받은 파라미터를 가지고 위에서 선언한 액션으로 이동
    return {type: CREATE, memo: memo};
}

export function updateBucket(memo_index){//함수에서 받은 파라미터를 가지고 위에서 선언한 액션으로 이동
  return {type: UPDATE, memo_index};
}
export function updateMemo(memo_index,memo){//함수에서 받은 파라미터를 가지고 위에서 선언한 액션으로 이동
  return {type: UPDATEM, memo_index, memo};
}

export function deleteBucket(memo_index){
  console.log("지울 버킷 인덱스", memo_index);//함수에서 받은 파라미터를 가지고 위에서 선언한 액션으로 이동
  return {type: DELETE, memo_index};
}

// middlewares
export const loadBucketFB = ()=>{
  return async function (dispatch){
    const memo_data = await getDocs(collection(db,"mylist"));
   
  //getDocs는 파이어 스토어에서 데이터 전부 가져올 수 있음
  //이때 쓰기 좋은 배열로 만들기 위해서 아래 작업이 필요
    let memo_list =[];

    memo_data.forEach((memo)=>{
      memo_list.push({id:memo.id,...memo.data()});
    });
    dispatch(loadBucket(memo_list));
    
  };
};

export const addBucketFB  =(memo)=>{
  return async function(dispatch){
   const docRef= await addDoc(collection(db,"mylist"), memo);
   // 파이어스토어 콜렉션 중 db에서 mylist를 선택해서 memo라는 값을 추가
  //이때 파이어 스토어에서 고유로 주는 id값을 같이 첨가해줍니다.
   const memo_data = {id: docRef.id, ...memo} 
 
   dispatch(createBucket(memo_data));
  }

}

export const updateBucketFB =(memo_id,memo_completed) => {
  return async function (dispatch, getState){
    
    const docRef = doc(db,"mylist",memo_id);
    if(memo_completed== false){
      await updateDoc(docRef,{completed:true});
    }else{
      await updateDoc(docRef,{completed:false});
  }
    //받아온 memo의 id값으로 해당 completed 값을 변경해주고
    const _memo_list = getState().mylist.list;
    // mylist라는 스토어에서 list값을 가져와 _memo_list에 부여해줍니다.
    const memo_index = _memo_list.findIndex((b)=>{
      //list내용 중 가져온 memo의 id값과 같은 id를 가진 index를 찾아줍니다.
      return b.id === memo_id;
    })
    dispatch(updateBucket(memo_index));
  };
};
export const updateMemoFB = (memo_id, memo) => {
  return async function (dispatch, getState) {
    
    const docRef = doc(db, "mylist", memo_id.list_id);
    //id값뿐만아니라 memo값도 같이 가져옵니다.
    await updateDoc(docRef, memo);
    //docRef에서 memo값을 update해줍니다.
    const _memo_list = getState().mylist.list;
    const memo_index = _memo_list.findIndex((b) => {
      return b.id === memo_id.list_id;
    });

    dispatch(updateMemo(memo_index, memo));
  }
}

export const deleteBucketFB = (memo_id) => {
  return async function (dispatch, getState){
    if(!memo_id){
      window.alert("아이디가 없네요");
      return;
    }
    const docRef = doc(db, "mylist",memo_id);
    await deleteDoc(docRef);
    const _memo_list = getState().mylist.list;    
    const memo_index = _memo_list.findIndex((b)=>{
      return b.id === memo_id;
    });

    dispatch(deleteBucket(memo_index));
  }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "memo/LOAD":{
      return {list: action.memo_list};
    }
    case "memo/CREATE": {
        const new_memo_list = [action.memo,...state.list] ;
        return {list : new_memo_list};
    }

    case "memo/UPDATE": {
      
      const new_memo_list = state.list.map((l, idx) => {
        if (parseInt(action.memo_index) === idx) {

          console.log(l.completed)
            // action.memo_index로 index값은 가져왔지만 spring으로 가져왔기 때문에 parseInt로 숫자로 바꿔줍니다.
          return (l.completed== true )?{ ...l, completed: false }:{ ...l, completed: true };
        }else{
          return l;
          // 앞에서 완료한 index값을 비교하여 true로 바꿔주고 그렇지 않을 경우 그대로 리턴합니다.
        }
      });
      return {list: new_memo_list};
    }

    case "memo/UPDATEM":{
      const new_memo_list = state.list.map((b, i) => {
        if(parseInt(action.memo_index) === i) { 
          return {
            ...b, 
            title:action.memo.title,
            name:action.memo.name,
            desc:action.memo.desc,
          };
        }else {
          return b;
        }
      });
      return {...state, list: new_memo_list};
    }
    

    case "memo/DELETE": {
      const new_memo_list = state.list.filter((l, idx) => {
        return parseInt(action.memo_index) !== idx;
      });
  
     return {list: new_memo_list};
    }
    default:
      return state;
  }
}
