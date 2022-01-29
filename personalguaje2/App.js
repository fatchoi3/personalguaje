
import React from "react";
import styled from "styled-components";
import { Route, Router, Switch } from "react-router-dom";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createBucket, loadBucketFB} from "./redux/modules/mylist";
import {db} from "./firebase";
// BucketList 컴포넌트를 import 해옵니다.
// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import MyList from "./MyList";
import Detail from "./Detail";
import { collection,doc, getDocs ,getDoc,addDoc, updateDoc,deleteDoc} from "firebase/firestore";


function App() {
  console.log(1)
  const history = useHistory();
  const dispatch= useDispatch();
  React.useEffect(async()=>{
    dispatch(loadBucketFB());
  
  }, []);

  return (
    <div>
      <Title>박현석</Title>
      <Line/>
    <Container>
        <Route path="/" exact>
          <MyList/>
        </Route>
        <Route path="/detail" component={Detail}>
            <Detail/>
          </Route>
    </Container>
    </div>
  );
}

const Container =styled. div`
display : flex;
justify-content :  space-between;
flex-wrap: wrap;
padding : 20px 10% 0px 10%

`
const Line =styled. hr`

`

const Title =styled. h1`
text-align: center;

`

export default App;
