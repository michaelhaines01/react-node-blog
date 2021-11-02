import React, { useEffect, useState, useContext } from "react";
import CreatePost from "../create-post/CreatePost";
import Editpost from "../edit-post/Editpost";
import ConfirmDelete from "../confirm-delete/Confirmdelete";
import { AuthContext } from "../../../GlobalStates";
import ConfirmPublish from "../confirm-publish/ConfirmPublishPost";
import "./Adminhome.scss";
import Formatdate from "../../format-date/Formatdate";
function Admin({ createPost, setCreatePost, showHide, setshowHide }) {
  const [userAuth] = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState({ edit: false });

  const [confirmDelete, setconfirmDelete] = useState({
    deleteId: "",
    confirmDelete: false,
  });

  const [confirmPublish, setConfirmPublish] = useState({
    publishId: "",
    ShowConfirmPublish: false,
    publish: false,
  });

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Authorization": `${userAuth.token}` },
    };
    fetch("/admin/", requestOptions)
      .then((res) => res.json())
      .then((posts) => setPosts(posts));
  }, [edit, createPost, confirmDelete, confirmPublish]);

  const deletePost = (id) => {
    setshowHide(true);
    setconfirmDelete((prevState) => ({
      ...prevState,
      deleteId: id,
      confirmDelete: true,
    }));
  };

  const editPost = (post) => {
    setshowHide(true);
    setEdit((prevState) => ({
      ...prevState,
      edit: true,
      post,
    }));
  };

  const publishPost = (id, publish) => {
    setshowHide(true);
    setConfirmPublish((prevState) => ({
      ...prevState,
      publishId: id,
      ShowConfirmPublish: true,
      publish,
    }));
  };

  return (
    <div className="admin-body-container">
      {createPost && (
        <CreatePost setshowHide={setshowHide} setCreatePost={setCreatePost} />
      )}
      {edit.edit && (
        <Editpost edit={edit} setEdit={setEdit} setshowHide={setshowHide} />
      )}
      {confirmDelete.confirmDelete && (
        <ConfirmDelete
          setconfirmDelete={setconfirmDelete}
          setshowHide={setshowHide}
          confirmDelete={confirmDelete}
        />
      )}
      {confirmPublish.ShowConfirmPublish && (
        <ConfirmPublish
          setConfirmPublish={setConfirmPublish}
          setshowHide={setshowHide}
          confirmPublish={confirmPublish}
        />
      )}
      <div className={"admin-posts " + (showHide && "active")}>
        {posts.map((post) => (
          <div className="admin-post-card" key={post._id}>
            <h1>{post.title}</h1>
            <Formatdate timestamp={post.timestamp} />
            <p>{post.content}</p>
            <div className="button-container">
              {post.published ? (
                <button onClick={() => publishPost(post._id, false)}>
                  Unpublish
                </button>
              ) : (
                <button onClick={() => publishPost(post._id, true)}>
                  Publish
                </button>
              )}
              <button onClick={(e) => editPost(post)}>Edit</button>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
