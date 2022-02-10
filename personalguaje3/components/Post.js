import React from "react";
import styled from "styled-components";
import { Grid, Image, Text, Button } from "../elements"
import { history } from "../redux/configureStore";
import { useEffect, useState } from "react";
import Like from "../elements/Like";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const Post = (props) => {
    const dispatch = useDispatch();
    
    const user_id = props.user_info.user_id
    const post_like_id_list = props.like
    const post_id =props.id
   
    useEffect(() => {
        setHeart(post_like_id_list.length)
    }, [post_like_id_list.length])

   
    let is_like = false;
     post_like_id_list.map((c,idx)=>{
        if(c===user_id){
            is_like =true;
        }
    })
    const [like, setLike] = useState(is_like)
    const [Heart,setHeart]= useState(post_like_id_list.length)
    const is_login = props.is_login
    const is_login2 =props.s_login
     
    
    const toggleLike = () => {
         if (!is_login&&!is_login2) {
             window.alert("로그인 해주세욥!")
           return;
        }
        setLike(!like)
        dispatch(postActions.LikeFB(post_id, user_id));    
    }

    return (
        <Grid padding="16px" bg="#EFF8FE">
            <Grid is_flex >
                <Grid is_flex width="auto" >
                    <Image
                        shape="circle"
                        src={props.src} />
                    <Text bold>{props.user_info.user_name}</Text>
                </Grid>
                <Grid is_flex width="auto">
                    {props.is_me && (<Button width="auto" margin="4px " padding="4px" _onClick={() => {
                        history.push(`/write/${props.id}`)
                    }}>수정</Button>)}
                    <Text>{props.insert_dt}</Text>
                </Grid>
            </Grid>
            {props.post_posi === '0' && <Grid is_flex bg="#8FD3D6" _onClick={() => {
                history.push(`/post/${props.id}`)
            }}>
                <Grid bg="#CFEEF3" center height="150px" margin="auto auto auto 10px" line_height="100px">
                    <Text>{props.contents}</Text>
                </Grid>
                <Image shape="rectangle" src={props.image_url} size={5} />
            </Grid>}
            {props.post_posi === '1' && <Grid is_flex bg="#8FD3D6" _onClick={() => {
                history.push(`/post/${props.id}`)
            }}>
                <Image shape="rectangle" src={props.image_url} size="5" />
                <Grid bg="#CFEEF3" center height="150px" margin="auto 10px auto 10px" line_height="100px">
                    <Text>{props.contents}</Text>
                </Grid>
            </Grid>}
            {props.post_posi === '2' && <Grid bg="#8FD3D6"  _onClick={() => {
                history.push(`/post/${props.id}`)
             }}> 
             
             <Grid bg="#CFEEF3"center height="100px" width="150px" margin="auto" line_height="100px">
                    <Text>{props.contents}</Text>
                </Grid>
                  
                <Grid is_flex padding="20px">
                <Text></Text>
                <Image shape="rectangle" src={props.image_url} />
                <Text></Text>
                </Grid>
            </Grid>}
            <Grid padding="16px" is_flex>
                <Text margin="0px" bold>댓글{props.comment_cnt}개</Text>
                
                <HanJul>
                <Like like={like} onClick={toggleLike} />
                <Text>좋아요{Heart}</Text>
                </HanJul>
            </Grid>
        </Grid>
    )
  
}

Post.defaultProps = {
    user_info: {
        user_name: "종현",
        user_profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfSozchojvNgOjInEW98n570p70OopLGJJgQ&usqp=CAU",
    },
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfSozchojvNgOjInEW98n570p70OopLGJJgQ&usqp=CAU",
    contents: "우유네요!",
    comment_cnt: 10,
    insert_dt: "2021-02-27 10:00:00",
    is_me: false,
    post_posi: "0"
}


const HanJul = styled.div`
display= flex
`
export default Post;