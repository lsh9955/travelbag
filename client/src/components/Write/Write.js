import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Dropzone from "react-dropzone";
import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../firebase";

const Write = () => {
  const [currentId, setCurrentId] = useState(0);
  const [postData, setPostData] = useState({ title: "", message: "", tags: [], selectedFile: "" });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const [progress, setProgress] = useState(0);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: [], selectedFile: "" });
  };

  const onDrop = (files) => {
    if (!files[0]) return;
    const storageRef = ref(storage, `/files/${files[0].name + Date.now()}`);

    const uploadTask = uploadBytesResumable(storageRef, files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pg = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(pg);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setPostData({ ...postData, selectedFile: url }));
      }
    );
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);
  useEffect(() => {}, [postData.selectedFile]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          로그인해주세요
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post?.title}"` : "게시글 쓰기"}</Typography>
        <TextField name="title" variant="outlined" label="제목" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="설명" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput name="tags" variant="outlined" label="태그" fullWidth value={postData.tags} onAdd={(chip) => handleAddChip(chip)} onDelete={(chip) => handleDeleteChip(chip)} />
        </div>
        <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
          {({ getRootProps, getInputProps }) => (
            <div style={{ width: "300px", height: "240px", border: "1px solid lightgray", display: "flex", alignItems: "center", justifyContent: "center" }} {...getRootProps()}>
              <input {...getInputProps()} />+
            </div>
          )}
        </Dropzone>
        {progress}% 업로드 완료
        <div>{postData.selectedFile ? <img src={`${postData.selectedFile}`} /> : ""}</div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
          글 올리기
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          모두 취소
        </Button>
      </form>
    </Paper>
  );
};

export default Write;
