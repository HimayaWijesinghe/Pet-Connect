import React, { useState } from "react";
import { storage, ref, uploadBytesResumable, getDownloadURL } from "./firebase";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) return;

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageUrl(downloadURL);
        console.log("File available at", downloadURL);
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>Upload Progress: {progress}%</p>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: "200px" }} />}
    </div>
  );
};

export default ImageUpload;
