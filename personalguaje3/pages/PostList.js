import React from "react";
import { useSelector,useDispatch } from "react-redux";

import { useState } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import { Grid } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";


const PostList = (props)=>{
    const dispatch=useDispatch();
    const post_list =useSelector((state)=> state.post.list);
    const user_info = useSelector((state)=> state.user.user);
    const is_loading = useSelector((state)=> state.post.is_loading);
    const paging =useSelector((state)=> state.post.paging);
    const is_user = useSelector((state) => state.user);
    const is_login = is_user.is_login
    const text = useSelector((state)=> state.user);

    console.log("text ",text)
    React.useEffect(() => {

        if(post_list.length < 2){
            dispatch(postActions.getPostFB());
        }

    },[]);
return(
    <React.Fragment>
        <Grid bg="#7B8285" padding="20px 0px">
      {/*<Post/>*/}
      <InfinityScroll 
          callNext={()=>{
              dispatch(postActions.getPostFB(paging.next));
          }}
          is_next={paging.next?true:false}
          loading={is_loading}>
          
      {post_list.map((p,idx)=>{
          if(p.user_info.user_id ===user_info?.uid){
              return (
                  <Grid bg="#ffffff" 
                   margin="8px 10px"
                   key={idx} 
                   is_flex
                   ><Grid >
                      <Post  key={p.id}  is_login={is_login} is_me post_id={p.id} idx={idx} user_info={user_info} is_user={is_user}{...p}/>
                      </Grid>
                       <Line/>
                  </Grid>
              )
          }else{
            return (
                <Grid bg="#ffffff" 
                margin="8px 10px"
                key={idx} 
                is_flex
                ><Grid>
                      <Post  {...p} is_login={is_login} is_user={is_user} />
                      </Grid>
                      <Line/>
                  </Grid>
            )
          }
      })}
      
      </InfinityScroll>
      </Grid>
    </React.Fragment>
)

}
const Line =styled.hr`
size: 10px;
align: center;
`
export default PostList;