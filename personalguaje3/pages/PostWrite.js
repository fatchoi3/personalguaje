import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements"
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";
import styled from "styled-components";


const PostWrite = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state) => state.post.list);
    // const post_posi=document.getElementsById('post_posi')

    const [post_posi, setPosi] = React.useState("");

    const is_image = preview ? true : false;
    const changeRadioQ1 = (e) => {
        setPosi(e.target.value);
    };

    const post_id = props.match.params.id
    const is_edit = post_id ? true : false;
    const is_posi = post_posi ? true : false;
    const { history } = props;
    const is_jebal = (is_image && is_posi) ? true : false;
    
    let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

    const [contents, setContents] = React.useState(_post ? _post.contents : "");
    const is_contents = contents ? true : false;
    console.log("is_contents", is_contents)
    console.log("is_image", is_image)
    console.log("is_posi", is_posi)
    console.log("is_jebal", is_jebal)
    React.useEffect(() => {
        if (is_edit && !_post) {
            console.log("포스트 정보가 없어요");
            history.goBack();

            return;
        }

        if (is_edit) {
            dispatch(imageActions.setPreview(_post.image_url));
        }
    }, []);
    const changeContents = (e) => {
        setContents(e.target.value);
    }

    const addPost = () => {
        dispatch(postActions.addPostFB(contents, post_posi))
    }

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id, { contents: contents, post_posi: post_posi }));
    };
    const delPost = () => {
        dispatch(postActions.delPostFB(post_id));
        history.replace("/")
    };
    
    const onRemove = () => {
        if (window.confirm("정말 삭제합니까?")) {
            delPost();
        } else {
          alert("취소합니다.");
        }
      };
    if (!is_login) {
        return (
            <Grid margin="100px 0px" padding="16px" cen>
                <Text size="32px" bold>앗 잠깐!</Text>
                <Text size="16px"> 로그인 후에만 글을 쓸 수 있어요!</Text>
                <Button _onClick={() => { history.replace("/"); }}>로그인 하러가기</Button>
            </Grid>
        )
    }
    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold>
                    {is_edit ? "게시글 수정" : "게시글 작성"}
                </Text>
                <Upload />
            </Grid>
            <Grid>
                <Grid padding="16px">
                    <Text margin="0px" size="24px" bold>미리 보기</Text>
                </Grid>
                <Grid >

                    <input type="radio" id="0" name="post_posi" value="0" onChange={changeRadioQ1} checked={post_posi === "0" ? true : false} />
                    오른쪽
                    <Grid is_flex bg="#8FD3D6" >
                        <Grid bg="#CFEEF3" center height="150px" margin="auto auto auto 10px" line_height="100px">
                            <Text>여기에 글이 들어가욥!</Text>
                        </Grid>
                        <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"} />
                    </Grid>



                </Grid>
                <Grid >

                    <input type="radio" id="1" name="post_posi" value="1" onChange={changeRadioQ1} checked={post_posi === "1" ? true : false} />
                    왼쪽
                    <Grid is_flex bg="#8FD3D6">
                        <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"} />
                        <Grid bg="#CFEEF3" center height="150px" margin="auto 10px auto 10px" line_height="100px">
                            <Text>여기에 글이 들어가욥!</Text>
                        </Grid>
                    </Grid>




                </Grid>
                <div>
                    <input type="radio" id="2" name="post_posi" value="2" onChange={changeRadioQ1} checked={post_posi === "2" ? true : false} />
                    가운데
                    <Grid bg="#8FD3D6" >

                        <Grid bg="#CFEEF3" center height="100px" width="150px" margin="auto" line_height="100px">
                            <Text>여기에 글이 들어가욥</Text>
                        </Grid>

                        <Grid is_flex padding="20px">
                            <Text></Text>
                            <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"} />
                            <Text></Text>
                        </Grid>
                    </Grid>

                </div>

            </Grid>

            <Grid padding="16px">
                <Input value={contents} _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine />
            </Grid>

            <Grid padding="16px">
                {is_edit ? (
                    <Grid is_flex>
                        <Button text="게시글 수정" _onClick={editPost} ></Button>
                        <Button text="삭제" _onClick={onRemove}></Button>
                    </Grid>
                ) : (
                    <Button text="게시글 작성" _onClick={addPost} disabled={(is_jebal && is_contents) ? false : true}></Button>)}

            </Grid>
        </React.Fragment>
    )
}
const check0 = styled.div`
display: flex;
justify-content:flex-end

`
const check1 = styled.div`
display: flex;


`
const check2 = styled.div`
display: flex;
justify-content:flex-end

`
export default PostWrite;