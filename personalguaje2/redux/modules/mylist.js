
// bucket.js
import {db} from "../../firebase";
import { 
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc
  } from "firebase/firestore";

// Actions
const LOAD = "memo/LOAD"
const CREATE = "memo/CREATE";
const UPDATE = "memo/UPDATE";
const DELETE = "memo/DELETE";

const initialState = {
  list: [
    { title: "영화관 가기1", name: "박현석", desc: "그는 신인가", completed: false },
    { title: "매일 책읽기2", name: "박현석", desc: "그는 신인가",completed: false },
    { title: "수영 배우기3",  name: "박현석", desc: "그는 신인가",completed: false },
    { title: "코딩하기4", name: "박현석", desc: "그는 신인가", completed: false },
  ],
};

// Action Creators
export function loadBucket(memo_list){
  return{type : LOAD,memo_list}
}
export function createBucket(memo){
  console.log("액션을 생성할거야!");
    return {type: CREATE, memo: memo};
}

export function updateBucket(memo_index){
  return {type: UPDATE, memo_index};
}

export function deleteBucket(memo_index){
  console.log("지울 버킷 인덱스", memo_index);
  return {type: DELETE, memo_index};
}

// middlewares
export const loadBucketFB = ()=>{
  return async function (dispatch){
    const memo_data = await getDocs(collection(db,"mylist"));
    console.log(memo_data)

    let memo_list =[];
    memo_data.forEach((memo)=>{
      console.log(memo.data())
      memo_list.push({id:memo.id,...memo.data()});
    });

    console.log(memo_list,1);
    dispatch(loadBucket(memo_list));
  };
};

export const addBucketFB  =(memo)=>{
  return async function(dispatch){
   const docRef= await addDoc(collection(db,"mylist"), memo);
  //  const _memo =await getDoc(docRef);
   const memo_data = {id: docRef.id, ...memo} 
 

   dispatch(createBucket(memo_data));
  }

}

export const updateBucketFB =(memo_id) => {
  return async function (dispatch, getState){
    console.log(memo_id,1)
    const docRef = doc(db,"mylist",memo_id);
    await updateDoc(docRef,{completed:true});

    console.log(getState().mylist,2);
    const _memo_list = getState().mylist.list;
    const memo_index = _memo_list.findIndex((b)=>{
      return b.id === memo_id;
    })
    dispatch(updateBucket(memo_index));
  };
};

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
        console.log("이제 값을 바꿀거야!");
        const new_memo_list = [...state.list, action.memo];
        return {list : new_memo_list};
    }

    case "memo/UPDATE": {
      
      const new_memo_list = state.list.map((l, idx) => {
        if (parseInt(action.memo_index) === idx) {
          return { ...l, completed: true };
        }else{
          return l;
        }
      });
      console.log({ list: new_memo_list });
      return {list: new_memo_list};

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
