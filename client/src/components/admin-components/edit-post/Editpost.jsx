import { useState, useContext } from "react";

import { AuthContext } from "../../../GlobalStates";
import "./edit-post-form.scss";
import baseURL from "../../../config.js";
export default function Editpost({ edit, setEdit, setshowHide }) {
  const [userAuth] = useContext(AuthContext);
  const [post, setPost] = useState({
    title: edit.post.title,
    content: edit.post.content,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Authorization": `${userAuth.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    };
    fetch(`${baseURL}/admin/edit/${edit.post._id}`, requestOptions).then(
      (res) => console.log(res.json())
    );
    setshowHide(false);
    setEdit((prevState) => ({
      ...prevState,
      edit: false,
    }));
  };

  const handleCancel = () => {
    setshowHide(false);
    setEdit((prevState) => ({
      ...prevState,
      edit: false,
    }));
  };

  const handleInput = (e) => {
    let { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="edit-form-container">
      <div className="header-container">
        <h1>Edit Post</h1>
        <button onClick={() => handleCancel()}>X</button>
      </div>
      <form>
        <label htmlFor="title"></label>
        <input
          type="text"
          name="title"
          defaultValue={edit.post.title}
          onChange={handleInput}
        />
        <label htmlFor="content"></label>
        <textarea
          type="text"
          name="content"
          defaultValue={edit.post.content}
          onChange={handleInput}
        />
        <button onClick={(e) => handleSubmit(e)}>Edit post</button>
      </form>
    </div>
  );
}
