import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Popper from "@mui/material/Popper";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, pink, purple, indigo, blue, green, amber, deepOrange } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditPost from "./EditPost";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const colorPalette = [red, purple, indigo, blue, green, amber, deepOrange, pink];

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post({ post, deletePost, updatePost }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [avatar, setAvatar] = React.useState();
  const [editMode, setEditMode] = React.useState(false);
  const [like, setLike] = React.useState(post ? post.isUseLike : false);
  const [openVertMenu, setOpenVertMenu] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClickLikeBtn = () => {
    setLike(!like);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenVertMenu(false);
  };
  const handleClickDeleteBtn = (id) => {
    deletePost(id);
    setOpenVertMenu(false);
  };
  const handleClickEditBtn = () => {
      setOpenVertMenu(false);
      setEditMode(true);
  }

  /* 아바타 세팅은 마운트될 때 한번만 실행 */
  React.useEffect(() => {
    setAvatar(
      <Avatar
        sx={{
          bgcolor: colorPalette[Math.floor(Math.random() * colorPalette.length)][500],
        }}
        aria-label="recipe"></Avatar>
    );
  }, []);


  return (
    editMode ? <EditPost post={post} setEditMode={setEditMode} updatePost={updatePost}/> :
    <Card id={"post-" + (post ? post.id : "null")} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={avatar}
        action={
          <>
            <IconButton
              aria-label="settings"
              id={"openVertMenuElement-" + (post ? post.id : "null")}
              onClick={() => setOpenVertMenu(!openVertMenu)}>
              <MoreVertIcon />
            </IconButton>
            <Popper
              open={openVertMenu}
              anchorEl={document.getElementById("openVertMenuElement-" + (post ? post.id : "null"))}
              placement="bottom-end"
              transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={200}>
                  <Paper className="d-flex flex-column align-items-start">
                    <Button
                      className="d-flex flex-row justify-content-start align-items-center"
                      color="inherit"
                      sx={{ fontSize: "12px", width: "100%" }}
                      onClick={handleClickEditBtn}>
                      <EditOutlinedIcon className="me-1" /> Edit
                    </Button>
                    <Button
                      className="d-flex flex-row justify-content-start align-items-center"
                      color="error"
                      sx={{ fontSize: "12px", width: "100%" }}
                      onClick={() => setOpenDialog(true)}>
                      <DeleteOutlineOutlinedIcon className="me-1" /> Delete
                    </Button>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </>
        }
        title={post ? post.title : "Title"}
        subheader={post ? post.time : "Month Day, Year"}
      />
      <CardMedia
        component="img"
        height="194"
        image={
          post ? (post.image_url ? post.image_url : "/static/images/no-photo.jpeg") : "/static/images/no-photo.jpeg"
        }
        alt="thumbnail"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post ? post.summary : "Summary of the post"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleClickLikeBtn}>
          <FavoriteIcon sx={like ? { color: red[500] } : null} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{post ? post.content : "Content of the post"}</Typography>
        </CardContent>
      </Collapse>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{(post ? post.title : "게시물") + "을(를) 삭제하시겠습니까?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">삭제된 게시물은 다시 복구될 수 없습니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            취소
          </Button>
          <Button
            onClick={() => {
              handleClickDeleteBtn(post ? post.id : null);
            }}
            color="error">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default Post;
