import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";

// BucketList 컴포넌트를 import 해옵니다.
// import [컴포넌트 명] from [컴포넌트가 있는 파일경로];
import BucketList from "./BucketList";
import Mon from "./Mon";
import Tus from "./Tus";
import Wed from "./Wed";
import Thu from "./Thu";
import Fri from "./Fri";
import Sat from "./Sat";
import Sun from "./Sun";

function App() {

 
  const day=["일","월", "화", "수","목","금","토"]
  const date = new Date();
  const day8= date.getDay()
  const day1 = day[day8]
  const day2 = day[day8+1<7 ?day8+1 :day8+1-7]
  const day3 = day[day8+2<7 ?day8+2 :day8+2-7]
  const day4 = day[day8+3<7 ?day8+3 :day8+3-7]
  const day5 = day[day8+4<7 ?day8+4 :day8+4-7]
  const day6 = day[day8+5<7 ?day8+5 :day8+5-7]
  const day7 = day[day8+6<7 ?day8+6 :day8+6-7]
  const list=[day1,day2, day3, day4,day5,day6,day7]
  
  return (
    <div className="App">
      
      <Container>
        {/* 컴포넌트를 넣어줍니다. */}
        {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
        <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <BucketList list={list}/>

          )}
        />
        <Route path="/Mon" component={Mon} />
        <Route path="/Tus" component={Tus} />
        <Route path="/Wed" component={Wed} />
        <Route path="/Thu" component={Thu} />
        <Route path="/Fri" component={Fri} />
        <Route path="/Sat" component={Sat} />
        <Route path="/Sun" component={Sun} />
        <Route component={NotFound} />
        </Switch>
      </Container>
    </div>
  );
}


const Container = styled.div`
  max-width: 400px;
  min-height: 90vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;





export default App;
