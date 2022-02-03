
//configStore.js
import { createStore, combineReducers, applyMiddleware,compose } from "redux";
import mylist from "./modules/mylist";
import thunk from "redux-thunk"

const middlewares = [thunk];
// root 리듀서를 만들어줍니다.
// 나중에 리듀서를 여러개 만들게 되면 여기에 하나씩 추가해주는 거예요!
const rootReducer = combineReducers({ mylist });
const enhancer = applyMiddleware(...middlewares);//미들웨어를 추가하여 스토어에 파이어 스토어를 연결
// 스토어를 만듭니다.
const store = createStore(rootReducer, enhancer);

export default store;
