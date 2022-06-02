import { Button, Container, Grid, Typography } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { LoginContext } from "../context/LoginContext";
import Post from "./Post";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import NewPost from "./NewPost";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

const MainPageContainer = styled.div``;

const ACTION_TYPES = {
  ADD_POST: "add-post",
  DELETE_POST: "delete-post",
  UPDATE_POST: "update-post",
  READ_POSTS: "read-posts",
  READ_POST: "read-post",
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_POST:
      console.log("Add Post ", action.newPost);
      return {
        ...state,
        posts: [...state.posts, action.newPost],
      };
    case ACTION_TYPES.DELETE_POST:
      console.log("Delete Post ", action.postId);
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    default:
      return state;
  }
};

function MainPage() {
  const mid = useMediaQuery("(min-width:900px)");
  const sml = useMediaQuery("(min-width:700px)");
  const xSml = useMediaQuery("(min-width:400px)");
  const { user } = useContext(LoginContext);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
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
        // image_url: "https://picsum.photos/200/300",
        summary: "두번째 글은 어떤 기록입니다.",
        content:
          "오늘 하루는 아주 기분이 좋다. 아침에 일어날 때 상쾌했고, 점심도 맛있게 먹었고, 저녁도 맛있게 먹었기 때문이다.",
        isLike: false,
        likeCnt: 0,
      },
    ],
  });
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

  return (
    <MainPageContainer>
      <Container>
        <Typography variant="subtitle1" className="my-3">
          {user && user.name + " 님, 환영합니다."}
        </Typography>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <Typography variant="h4" className="mb-3" sx={{ fontWeight: "bold" }}>
            Posts
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenNewPost(!openNewPost)}>
            {openNewPost ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}
          </Button>
        </div>

        {openNewPost && <NewPost addPost={addPost} />}

        <Grid container rowSpacing={2} columnSpacing={2}>
          {state.posts.map((post, idx) => (
            <Grid item xs={mid ? 3 : sml ? 4 : xSml ? 6 : 12} key={idx}>
              <Post post={post} deletePost={deletePost} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainPageContainer>
  );
}

export default MainPage;
