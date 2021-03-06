import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    onAuthStateChanged,
    signOut,  
    reload
} from "firebase/auth";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie"
import { auth } from "../../shared/firebase";


//actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER"
//action creators


const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

//initialState
const initialState = {
    user: { uid:null},
    is_login: false,
    
}


const user_initial = {
    user_name: 'jong0325'
}

//middleware actions

const loginFB = (id, pwd) => {
    return function (dispatch, getState, { history }) {

        setPersistence(auth, browserSessionPersistence).then((res) => {
            signInWithEmailAndPassword(auth, id, pwd)
                .then((user) => {
                    console.log(user,1)
                    dispatch(setUser({
                        user_name: user.user.displayName,
                        id: id,
                        user_profile: "",
                        uid: user.user.uid
                    }))
                    history.push("/");
                })
                .catch((error) => {

                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode)
                    console.log(errorMessage)
                });
        });



    }
}
const signupFB = (id, pwd, user_name) => {

    return function (dispatch, getState, { history }) {


        createUserWithEmailAndPassword(auth, id, pwd)
            .then((user) => {
                // Signed in

                console.log(user);

                updateProfile(auth.currentUser, {
                    displayName: user_name,
                }).then(() => {
                    dispatch(setUser({
                        user_name: user_name,
                        id: id,
                        user_profile: "",
                        uid: user.user.uid
                    }));
                    history.push('/');
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    console.log(error)
                    // An error occurred
                    // ...
                });
                // ...
            })
            .catch((error) => {
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
}
const loginCheckFB=()=>{
    return function(dispatch, getState,{history}){
        onAuthStateChanged(auth, user => {
            if(user){
                dispatch(setUser({
                     user_name:user.displayName,
                    user_profile:"",
                    id: user.email,
                    uid: user.uid
                }
                ));
            }else{
                dispatch(logOut());
            }
          });
    }
}



const logoutFB = () => {
        return function (dispatch,getState,{history}){
            signOut(auth).then(() => {
                dispatch(logOut());
                window.location.replace("/")
              });
        };
}


//reducer
export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft) => {
        setCookie("is_login", "SUCCESS")
        draft.user = action.payload.user;
        draft.is_login = true;

    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
    }),
    [GET_USER]: (state, action) => produce(state, (draft) => { }),
},
    initialState
);

//action creator export
const actionCreators = {
    logOut,
    getUser,
    loginFB,
    signupFB,
    loginCheckFB,
    logoutFB
};

export { actionCreators }