import React from "react";
import styled from "styled-components";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Avatar,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const EditPostContainer = styled.div`
  .content-area {
    font-size: small;
  }
`;

function EditPost({ post, setEditMode, updatePost }) {
  const handleClickComplete = (id) => {
    let title = document.getElementById("title-edit").value;
    let summary = document.getElementById("summary-edit").value;
    let content = document.getElementById("content-edit").value;
    updatePost(id, title, summary, content);
    setEditMode(false);
  };

  return (
    <EditPostContainer>
      <Card id={"edit-" + (post ? post.id : "null")} sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar></Avatar>}
          action={
            <IconButton color="success" onClick={() => handleClickComplete(post.id)}>
              <CheckOutlinedIcon />
            </IconButton>
          }
          title={<TextField id="title-edit" label="제목" variant="outlined" size="small" defaultValue={post.title} />}
          subheader={post ? post.time : "Month Day, Year"}
        />
        <CardContent>
          <TextField
            fullWidth
            id="summary-edit"
            label="요약"
            variant="outlined"
            size="small"
            defaultValue={post.summary}
          />
        </CardContent>

        <CardContent>
          <TextareaAutosize
            id="content-edit"
            minRows={6}
            placeholder="내용"
            defaultValue={post.content}
            style={{ width: "100%", border: "solid 1px #c5cacf", borderRadius: "4px" }}
          />
        </CardContent>
      </Card>
    </EditPostContainer>
  );
}

export default EditPost;
