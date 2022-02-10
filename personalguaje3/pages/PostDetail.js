import React from "react";
import Post from "../components/Post"
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { history } from "../redux/configureStore"
import { useSelector,useDispatch } from "react-redux";

import { actionCreators as postActions} from "../redux/modules/post";

const PostDetail = (props)=>{
    const dispatch =useDispatch();
    const id = props.match.params.id;
    const [contents, setContents] = React.useState("");
    const user_info = useSelector((state)=> state.user.user);

    const post_list = useSelector(state => state.post.list);

    const post_idx = post_list.findIndex(p=>p.id===id);
    const post = post_list[post_idx];


    React.useEffect(()=>{
       
        if(post){
            return; 
        }
        dispatch(postActions.getOnePostFB(id))

    },[]);
    const write = () => {
        if(contents === ""){
            window.alert("댓글을 입력해주세요!");
          return;
        }

    }

    return(
        <React.Fragment>
      {post && (
        <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}
      <CommentWrite
        _onChange={(e) => {
          setContents(e.target.value);
        }}
        _onClick={write}
      />
      <CommentList />
    </React.Fragment>
    )
}
export default PostDetail;