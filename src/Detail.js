import React from "react";
import {useHistory}from "react-router-dom";
import{useSelector,useDispatch} from "react-redux";
import {createBucket,addBucketFB} from "./redux/modules/mylist";

const Detail = (props) => {
    const history = useHistory();
    const bucket_list = useSelector((state) => state.mylist.list);
    const title = React.useRef(null);
    const name = React.useRef(null);
    const desc = React.useRef(null);
  const dispatch = useDispatch();

  const addBucketList = () => {
    // 스프레드 문법! 기억하고 계신가요? :)
    // 원본 배열 list에 새로운 요소를 추가해주었습니다.
    // setList([...list, text.current.value]);

    dispatch(addBucketFB({ 
        title: title.current.value,
        name: name.current.value,
        desc: desc.current.value ,
        completed: false}));
  };
    return (
        <div>
       제목<input type="text" ref={title}/>
        작성자<input type="text" ref={name}/>
        내용<input type="text" ref={desc}/>
            <button onClick={() => {
                addBucketList();
          history.push("/");
        }}
            >글 남기기</button>
            <button onClick={() => {
          history.push("/");
        }}>뒤로 가기</button>
      </div>
    );
}

export default Detail;
