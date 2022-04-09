import React, { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import Dropzone from "react-dropzone";

export const UploadPage = () => {
  const [progress, setProgress] = useState(0);

  const uploadFile = (file: any) => {
    if (!file) return;

    const storageRef = ref(storage, `/files/${file.name + Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pg = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(pg);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
      }
    );
  };

  const onDrop = (files: any) => {
    uploadFile(files[0]);
  };

  return (
    <>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div style={{ width: "300px", height: "240px", border: "1px solid lightgray", display: "flex", alignItems: "center", justifyContent: "center" }} {...getRootProps()}>
            <input {...getInputProps()} />+
          </div>
        )}
      </Dropzone>
      <div>{progress} % 완료되었습니다</div>
    </>
  );
};
