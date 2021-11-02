import React, { useState } from "react";
import Comments from "../comments/Comments";
import "./post.scss";
import Formatdate from "../../format-date/Formatdate";

function Post({ post, setPost, showHide, setshowHide }) {
  const [openComments, setOpenComments] = useState({
    visible: false,
    commentId: null,
  });

  const handleCancel = () => {
    setPost((prevState) => ({
      ...prevState,
      showPost: false,
    }));
    setshowHide(!showHide);
  };

  return (
    <div className="post-container">
      <div className="header-container">
        <h1>{post.Post.title}</h1>
        <button onClick={() => handleCancel()}>X</button>
      </div>
      <Formatdate timestamp={post.Post.timestamp} />
      <p>{post.Post.content}</p>
      {openComments.visible && openComments.commentId === post.Post._id ? (
        <h6
          onClick={() => setOpenComments({ visible: false, commentId: null })}
        >
          Hide comments
        </h6>
      ) : (
        <h6
          onClick={() =>
            setOpenComments({ visible: true, commentId: post.Post._id })
          }
        >
          Show comments
        </h6>
      )}
      {openComments.visible && openComments.commentId === post.Post._id ? (
        <Comments id={openComments.commentId} />
      ) : null}
    </div>
  );
}

export default Post;
