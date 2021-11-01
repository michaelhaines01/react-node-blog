import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./home.scss";
import Header from "../header/Header";
import Postoverview from "../post-overview/Postoverview";

function Homepage() {
  const [posts, setposts] = useState([]);
  const [showHide, setshowHide] = useState(false);
  const [post, setPost] = useState({ showPost: false, Post: {} });
  useEffect(() => {
    fetch("/posts").then((res) => res.json().then((posts) => setposts(posts)));
  }, []);

  return (
    <div className="body-container">
      <Header title="Welcome to my thoughts." />
      <div className={"posts-container " + (showHide && "active")}>
        {posts.map((post) => (
          <Postoverview
            title={post.title}
            content={post.content}
            timestamp={post.timestamp}
            key={post._id}
            post={post}
            setPost={setPost}
            setshowHide={setshowHide}
          />
        ))}
      </div>
      {post.showPost && (
        <Post
          post={post}
          setPost={setPost}
          showHide={showHide}
          setshowHide={setshowHide}
        />
      )}
    </div>
  );
}

export default Homepage;
