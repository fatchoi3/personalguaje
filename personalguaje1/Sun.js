// 리액트 패키지를 불러옵니다.
import React from "react";
import StarRating from "./StarRating";
import { useHistory } from "react-router-dom";

const Sun = (props) => {
    let history = useHistory();
  return <h1>일
      <StarRating/>
      <button onClick={() => {
          history.goBack();
        }}>평점 남기기</button>
      </h1>;
};

export default Sun;