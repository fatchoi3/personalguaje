
import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { updateBucketFB, deleteBucketFB } from "./redux/modules/mylist";
import { PlusCircleOutlined  } from '@ant-design/icons';
import "./GG.css"

const MyList = (props) => {
    const my_lists = useSelector((state) => state.mylist.list);// useSelector를 사용해서 스토리지에 리규서에 들어있는 mylist에서 list란 값을 가져옵니다.
    const dispatch = useDispatch();
    const history=useHistory() // useHistory함수를 사용해서 페이지 간에 이동을 했습니다
  return (
    <ListStyle>
       {my_lists.map((list, index) => {
         
        return (
          <ItemStyle completed={list.completed}  
          key={index} onClick={() => {
          }}>
           <p >제목 : {list.title}</p>
           <p > 작성자 : {list.name}</p>
           <p  style={{color:"blue"}}> 내용 : {list.desc}</p>
           <MiniStyle>
           <MiniButton onClick={()=>{
               dispatch(updateBucketFB(list.id,list.completed))
              //  updateBucketFB함수는  완료 버튼을 눌렀을 때 박스에 색이 변하도록 해줍니다.
           }}>완료</MiniButton>
           <MiniButton onClick={() =>{
      history.push("/update/"+list.id);// 수정 시 값을 바꿔주기 위해 메인 페이지에서 넘어갈 때 id값을 함께 보내줍니다
    }}
      >수정</MiniButton>
           <MiniButton 
           className="red"
           onClick={() => {
            dispatch(deleteBucketFB(list.id));
            }}//삭제 기능
            
            >삭제</MiniButton>
            </MiniStyle>
          </ItemStyle>
        );
      })}
      <Button style={{color:"white"}} onClick={() =>{
      history.push("/detail");
      }}><PlusCircleOutlined  className="rotate" /></Button>
    </ListStyle >
  );
};

const ListStyle = styled.div`  
  width:400px
  max-height: 50vh;
 
  
`;

const ItemStyle = styled.div`
  height: 200px; 
  width : 400px
  padding: 16px;
  margin: 8px;
  text-align: center;
  color: ${(props) => props.completed? "#FFEB5A": "#333"};
  background-color: ${(props) => (props.completed ? "#000000" : "#fff")};
  border-radius : 20px;
  border : solid 2px ${(props) => props.completed? "#FFEB5A": "#000"};
`;
const Button = styled. div`
width : 90px;
height : 90px;
border-radius: 45px;
position: fixed;
border : solid 2px white;
bottom: 2rem;
right: 2rem;
text-align: center;
padding: 20px 10px 20x 10px;
background-color : #FFB900 
`
const MiniButton = styled. button`
width : 50px;
height : 50px;
border-radius: 25px;
`
const MiniStyle = styled. div`
display : flex;
justify-content : space-between;
padding : 10px 70px 10px 70px;
`
export default MyList;
