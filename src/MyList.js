
import React from "react";
import styled from "styled-components";
import {useParams,useHistory} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { deleteBucket, updateBucket,loadBucketFB, updateBucketFB, deleteBucketFB } from "./redux/modules/mylist";

const MyList = (props) => {
    const my_lists = useSelector((state) => state.mylist.list);
    const dispatch = useDispatch();

const history=useHistory()
  return (
    <ListStyle>
       {my_lists.map((list, index) => {
        return (
          <ItemStyle completed={list.completed}  
          key={index} onClick={() => {
          }}>
           <p>제목 : {list.title}</p>
           <p> 작성자 : {list.name}</p>
           <p> 내용 : {list.desc}</p>
           <button onClick={()=>{
               dispatch(updateBucketFB(list.id))
           }}>완료</button>
           <button>수정</button>
           <button onClick={() => {
            dispatch(deleteBucketFB(list.id));
            }}>삭제</button>
          </ItemStyle>
        );
      })}
      <Button  onClick={() =>{
      history.push("/detail");
      }}>+</Button>
    </ListStyle>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  width:23%
  height: 50vh;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 50vh;
  justify-content : space-between;
  padding : 20px 10% 0px 10%
`;

const ItemStyle = styled.div`   
  padding: 16px;
  margin: 8px;
  color: ${(props) => props.completed? "#fff": "#333"};
  background-color: ${(props) => (props.completed ? "#673ab7" : "aliceblue")};
`;
const Box =styled. div`
border-radius: 10px;
border: solid 2px darkgrey;
width: 20%;
margin: 25px 10px 25px 10x;
background-color: white;
padding: 20px;
text-align: center;
`
const Button = styled. div`
width : 90px;
height : 90px;
border-radius: 180px;
position: fixed;
border : solid 2px;
bottom: 2rem;
right: 2rem;
text-align: center;
padding: auto;
vertical-align : middle;
`
export default MyList;
