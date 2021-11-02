import React from "react";
import "./Postoverview.scss";
import Formatdate from "../../format-date/Formatdate";
const MAX_LENGTH = 450;

export default function Postoverview({
  title,
  content,
  timestamp,
  post,
  setPost,
  setshowHide,
}) {
  const selectPost = (post) => {
    setPost((prevState) => ({
      ...prevState,
      showPost: true,
      Post: post,
    }));
    setshowHide(true);
  };

  return (
    <div className="post-card">
      <h1>{title}</h1>
      <Formatdate timestamp={timestamp} />
      <p>{`${content.substring(0, MAX_LENGTH)} ..........`}</p>
      <button onClick={() => selectPost(post)}>Show post</button>
    </div>
  );
}
