import { Button, Grid, TextField, Typography, Alert, Paper } from "@mui/material";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const NewPostContainer = styled.div``;

function NewPost({ addPost }) {
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = useCallback(()=> {
    setShowAlert(false);
  },[]);

  const handleClickSubmitBtn = () => {
      function checkValidation(inputs) {
        for(let i=0; i<inputs.length; i++){
          let input = inputs[i];
          if(input.value === ""){
            setShowAlert(true);
            input.focus();
            return false;
          }
        }
        return true;
      }
      const titleInput = document.getElementById("title");
      const summaryInput = document.getElementById("summary");
      const contentInput = document.getElementById("content");
      const requiredInputs = [titleInput, summaryInput, contentInput];
      if(checkValidation(requiredInputs)){
        addPost(titleInput.value, summaryInput.value, contentInput.value);
        titleInput.value = "";
        summaryInput.value = "";
        contentInput.value = "";
        titleInput.focus();
        closeAlert();
      } else {
        return;
      }
  };

  return (
    <Paper className="p-3 mb-3">
      <div className="d-flex flex-row align-items-center justify-content-between mb-2">
        <Typography variant="h5" sx={{ fontWeight: "bold" }} color="primary">
          New Post
        </Typography>
        <Button id="submit-btn" variant="outlined" onClick={handleClickSubmitBtn}>
          <CheckOutlinedIcon />
        </Button>
      </div>
      {showAlert && <Alert severity="error" className="mb-2">* 표시가 된 항목들은 필수 입력 항목입니다.</Alert>}
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={4}>
          <TextField id="title" fullWidth label="제목*" size="small" 
            onKeyDown={(e) => {
                if(e.key === "Enter"){
                    document.getElementById("summary").select();
                }
            }}/>
        </Grid>
        <Grid item xs={8}>
          <TextField id="summary" fullWidth label="요약*" size="small" 
            onKeyDown={(e) => {
                if(e.key === "Enter"){
                    document.getElementById("content").select();
                }
            }}/>
        </Grid>
        <Grid item xs={12}>
          <TextField id="content" fullWidth label="내용*" size="small" 
           onKeyDown={(e) => {
               if(e.key === "Enter"){
                   document.getElementById("submit-btn").click();
               }
           }}/>
        </Grid>
      </Grid>


    </Paper>
  );
}

export default NewPost;
