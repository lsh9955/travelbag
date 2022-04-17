import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch } from "react-redux";

import { commentPost } from "../../actions/posts";
import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment("");
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            댓글
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            댓글을 작성해보세요!
          </Typography>
          <TextField fullWidth rows={4} variant="outlined" label="댓글" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: "10px" }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
