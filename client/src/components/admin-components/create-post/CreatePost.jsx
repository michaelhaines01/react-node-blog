import React, { useState, useContext } from "react";
import { AuthContext } from "../../../GlobalStates";
import "./CreatePost.scss";
import baseURL from "../../../config.js";
export default function CreatePost({ setshowHide, setCreatePost }) {
  const [userAuth] = useContext(AuthContext);
  const [post, setPost] = useState({
    title: "",
    content: "",
    user: userAuth.user._id,
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${userAuth.token}`,
      },
      body: JSON.stringify(post),
    };
    fetch(`${baseURL}/admin/create/`, requestOptions).then((response) =>
      response.json()
    );
    setshowHide(false);
    setCreatePost(false);
  };

  const handleCancel = () => {
    setshowHide(false);
    setCreatePost(false);
  };

  const handleInput = (e) => {
    let { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="create-form-container">
      <div className="header-container">
        <h1>Create Post </h1>
        <button onClick={() => handleCancel()}>X</button>
      </div>
      <form
        onSubmit={(e) => {
          handlePostSubmit(e);
        }}
      >
        <input
          type="text"
          name="title"
          onChange={handleInput}
          placeholder="Title"
          required
        />
        <textarea
          type="text"
          name="content"
          onChange={handleInput}
          placeholder="Content"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
