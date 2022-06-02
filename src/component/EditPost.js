import React from "react";
import styled from "styled-components";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const EditPostContainer = styled.div``;

function EditPost({ post }) {

  return (
    <EditPostContainer>
      <Card id={"edit-" + (post ? post.id : "null")} sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar></Avatar>}
          action={
            <IconButton>
              <CheckOutlinedIcon />
            </IconButton>
          }
          title={post ? post.title : "Title"}
          subheader={post ? post.time : "Month Day, Year"}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post ? post.summary : "Summary of the post"}
          </Typography>
        </CardContent>

        <CardContent>
          <Typography paragraph>{post ? post.content : "Content of the post"}</Typography>
        </CardContent>
      </Card>
    </EditPostContainer>
  );
}

export default EditPost;
