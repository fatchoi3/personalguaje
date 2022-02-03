
import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loadBucketFB} from "./redux/modules/mylist";
// BucketList 컴포넌트를 import 해옵니다.
// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import MyList from "./MyList";
import Detail from "./Detail";
import Update from "./Update";


function App() {
  const history = useHistory();
  const dispatch= useDispatch();
  //dispatch()를 사용하면 HTML 안에서 reducer함수를 동작시킬 수 있다.
   //즉, 위의 '수량증가', '수량감소' 데이터 수정방법을 실행하는 것을 명령하기 위해 사용하는 함수이다.
  //dispatch({ type:데이터수정방법 }) 만 잘 지정해주면 된다.
//
  React.useEffect(async()=>{
    //useEffect함수는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 hook
    dispatch(loadBucketFB());
    //loadBucketFB는 파이어 베이스 ,파이어 스토어에 저장된 값을 불러오는 함수로 mylist에서 임포트 해줌
  }, []);

  return (  
    <BigContainer >
      <Title>나홀로 메모장</Title>
    <Container>
        <Route path="/" exact>
          <MyList/>
        </Route>
        <Route path="/detail" component={Detail}>
            <Detail/>
          </Route>
          <Route path="/update/:list_id" component={Update}>
            <Update/>
          </Route>
    </Container >
    </BigContainer>
  );
}

const BigContainer =styled.div`
background: linear-gradient(to top, #00008C 0%, #000069 50%, #323C73 100%);
`

const Container =styled. div`
max-width: 400px;
padding: 16px;
margin: 20px auto;
border-radius: 5px;
border: 1px solid #E0904C;
overflow-x: hidden;
overflow-y: auto;
background : #FDF5E6;


`
const Title =styled. h1`
text-align: center;
color: #FFEB5A;

`

export default App;
