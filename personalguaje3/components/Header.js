import React from "react";
import {Grid, Text, Button,Image} from "../elements";
import {getCookie, deleteCookie} from "../shared/Cookie";

import { useSelector, useDispatch} from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { apiKey } from "../shared/firebase";
import {history} from "../redux/configureStore";
import styled from "styled-components";


const Header = (props) => {
    const dispatch = useDispatch();
   const is_login = useSelector((state) => state.user.is_login);

   const _session_key=`firebase:authUser:${apiKey}:[DEFAULT]`;
   
   const is_session =sessionStorage.getItem(_session_key)?true:false;
    const back =() =>{
      history.push('/')
    }
    if(is_login && is_session){
        return (
        
            <Grid is_flex padding="10x 20px">
              <Grid is_flex>
              <Image src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdEBbbg%2Fbtrnpoj07qg%2FKU0nfuKf11FmQAsGuf8fi0%2Fimg.png"/>
                <Text margin="10px" size="24px" bold>
                 사진을 차곡 차곡~!
                </Text>        
              </Grid>
              <Grid is_flex >
              <Button _onClick={()=>{
                  history.push("/")
                }} text="홈"></Button>
                <Button text="내정보"></Button>
                
                <Button _onClick={()=>{
                  history.push("/noti")
                }} text="알림"></Button>
                <Button 
                text="로그아웃" 
                _onClick={() => {
                    dispatch(userActions.logoutFB({}))
                }}
                    ></Button>
              </Grid>
            </Grid>
       
        );
    }
    return (
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
            <Grid is_flex>
              <Image src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdEBbbg%2Fbtrnpoj07qg%2FKU0nfuKf11FmQAsGuf8fi0%2Fimg.png"/>
                <Text margin="10px" size="24px" bold>
                 사진을 차곡 차곡~!
                </Text>        
              </Grid> 

                <Grid is_flex>
                <Button _onClick={()=>{
                  history.push("/")
                }} text="홈"></Button>
                    <Button text="로그인" _onClick={()=>{
                        history.push('/login')
                    }}></Button>
                    <Button text="회원가입"_onClick={()=>{
                        history.push('/signup')
                    }}></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}


Header.defaultProps = {}
const Grod = styled.div`
display: flex
`
export default Header;