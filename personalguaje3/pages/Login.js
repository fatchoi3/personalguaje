
import React from "react";
import { Button, Grid, Input, Text } from "../elements";
import { getCookie ,setCookie, deleteCookie } from "../shared/Cookie";
import { useDispatch } from "react-redux"; 
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";


const Login = (props) => {
    const dispatch =useDispatch()

     const [id, setId] = React.useState('');
     const [pwd, setPwd] = React.useState('');


    const login = () => {


        if(id===""||pwd==""){
         window.alert("bye")
            return;
        }

        if(!emailCheck(id)){
            window.alert("이메일 형식이 맞지 않습니다!");
            return;
        }
        dispatch(userActions.loginFB(id,pwd));
        // setCookie("user_id", id, 3);
        // setCookie("user_pwd", pwd, 3);
    }
    return (
        <Grid padding="20px" bg="#CFEEF3">
            <Grid padding={16}>
                <Text type="heading" bold>로그인 페이지</Text>
            </Grid>
            <Grid padding={16}>
                <Input 
                label="이메일"   
                placeholder="아이디를 입력하세요."
                _onChange ={(e)=>{
                    setId(e.target.value);
                }}/>
                <Input 
                label="비밀번호" 
                type="password" 
                placeholder="비밀번호를 입력하세요."
                _onChange ={(e)=>{
                    setPwd(e.target.value);
                }}
                />
            </Grid>
                <Text></Text>
            <Button 
            text="로그인하기" 
            _onClick={() => {login()}} 
            disabled={(id===""||pwd=="")?true:false}
            color={(id===""||pwd=="")?"gray":"black"}
            >로그인</Button>
       </Grid>
    )
}

export default Login;
