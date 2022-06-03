import { Button, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useCallback, useContext, useReducer, useState } from "react";
import uuid from "react-uuid";
import { LoginContext } from "../context/LoginContext";
import NewPost from "./PostBoard/NewPost";
import Post from "./PostBoard/Post";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { POST_ACTION_TYPES as ACTION_TYPES } from "../action/ActionTypes";
import { PostReducer as reducer } from "../reducer/Reducer";

const initPosts = {
    posts: [
        {
            id: 1,
            title: "승윤이의 일기",
            time: "Thu Jun 02, 2022",
            author: "seungyoon",
            image_url: "https://picsum.photos/200/300",
            summary: "첫번째 글은 승윤이의 일기입니다.",
            content:
                "오늘 하루는 아주 기분이 좋다. 아침에 일어날 때 상쾌했고, 점심도 맛있게 먹었고, 저녁도 맛있게 먹었기 때문이다.",
            isLike: false,
            likeCnt: 0,
        },
        {
            id: 2,
            title: "승윤이의 두번째 기록",
            time: "Thu Jun 01, 2022",
            author: "seungyoon",
            summary: "두번째 글은 어떤 기록입니다.",
            content:
                "오늘 하루는 아주 기분이 좋다. 아침에 일어날 때 상쾌했고, 점심도 맛있게 먹었고, 저녁도 맛있게 먹었기 때문이다.",
            isLike: false,
            likeCnt: 0,
        },
    ],
};

function PostBoard() {
    const mid = useMediaQuery("(min-width:900px)");
    const sml = useMediaQuery("(min-width:700px)");
    const xSml = useMediaQuery("(min-width:400px)");
    const { user } = useContext(LoginContext);
    const [state, dispatch] = useReducer(reducer, initPosts);
    const [openNewPost, setOpenNewPost] = useState(true);

    const addPost = useCallback(
        (title, summary, content) => {
            const newPostId = uuid();
            const newPost = {
                id: newPostId,
                title: title,
                time: new Date().toDateString(),
                author: user ? user.id : "undefined",
                image_url: "https://picsum.photos/200/300",
                summary: summary,
                content: content,
                isLike: false,
                likeCnt: 0,
            };
            dispatch({ type: ACTION_TYPES.ADD_POST, newPost: newPost });
        },
        [user]
    );

    const deletePost = useCallback((deleteId) => {
        dispatch({ type: ACTION_TYPES.DELETE_POST, postId: deleteId });
    }, []);

    const updatePost = useCallback((updateId, title, summary, content) => {
        dispatch({
            type: ACTION_TYPES.UPDATE_POST,
            postId: updateId,
            title: title,
            summary: summary,
            content: content,
        });
    }, []);

    
    return (
        <Container className="pt-4">
            <div className="d-flex flex-row align-items-center justify-content-between">
                <Typography variant="h4" className="mb-3" sx={{ fontWeight: "bold" }}>
                    Posts
                </Typography>
                <Button variant="contained" onClick={() => setOpenNewPost(!openNewPost)}>
                    {openNewPost ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}
                </Button>
            </div>

            {openNewPost && <NewPost addPost={addPost} />}

            <Grid container rowSpacing={2} columnSpacing={2}>
                {state.posts.map((post, idx) => (
                    <Grid item xs={mid ? 3 : sml ? 4 : xSml ? 6 : 12} key={idx}>
                        <Post post={post} deletePost={deletePost} updatePost={updatePost} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default PostBoard;
