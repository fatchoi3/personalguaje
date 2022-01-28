// 리액트 패키지를 불러옵니다.
import React ,{useState}from "react";
import styled from "styled-components";
import { FaStar } from 'react-icons/fa';
import "App.css";
import Star from "./Star";

import { useHistory } from "react-router-dom";

const BucketList = (props) => {
  let history = useHistory();
  console.log(props);
  const my_lists = props.list;
  const date = new Date();
  const day= date.getDay()
    
  return (
    <ListStyle>
<Title >내 일주일은?</Title>

      {my_lists.map((list, index) => {
        return (
          <ItemStyle>         
            {list}<Star/>
              <Tran className="list_item"
            key={index}
            onClick={() => {
              if(index+day==0||index+day-7==0)
              history.push("/Sun");
              if(index+day==1||index+day-7==1)
              history.push("/Mon");
              if(index+day==2||index+day-7==2)
              history.push("/Tus");
              if(index+day==3||index+day-7==3)
              history.push("/Wed");
              if(index+day==4||index+day-7==4)
              history.push("/Thu");
              if(index+day==5||index+day-7==5)
              history.push("/Fri");
              if(index+day==6||index+day-7==6)
              history.push("/Sat");
            }}></Tran>
        </ItemStyle>
            

         
        );
      })}
    </ListStyle>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  background-color: aliceblue;
  display: flex;
  align-items: center;
`;
const Tran = styled.div`appearance: none;
    background-color: 
    transparent; 
    border-color: 
    transparent purple; 
    width: 0px; 
    height: 0px; 
    border-top-width: 1rem;
    border-top-style: solid; 
    border-bottom-width: 1rem; 
    border-bottom-style: solid; 
    border-left-width: 1.6rem; 
    border-left-style: solid; 
    color: rgb(255, 255, 255); 
    cursor: pointer;`
const Title = styled.h1`
    color: slateblue;
    text-align: center;
  `;
export default BucketList;
