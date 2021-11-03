import React, { useContext, useState } from "react";
import { AuthContext } from "../../../GlobalStates";
import Admin from "../admin-home/Adminhome";
import Adminlogin from "../admin-login/Adminlogin";
import "./AdminTopbar.scss";

export default function AdminTopbar() {
  const [userAuth] = useContext(AuthContext);
  const [createPost, setCreatePost] = useState(false);
  const [showHide, setshowHide] = useState(false);
  const AdminControls = () => {
    return (
      <div
        className="admin-items"
        onClick={() => {
          setCreatePost(true);
          setshowHide(true);
        }}
      >
        <h4>Create</h4>
        <a href="/login" className="logo">
          <h4>Logout</h4>
        </a>
      </div>
    );
  };

  return (
    <div className="admin-body">
      <div className="admin-topbar ">
        <div className="wrapper">
          <div className="left">
            <h1>Blog Admin</h1>
          </div>
          <div className="right">{userAuth.auth && AdminControls()}</div>
        </div>
      </div>
      {userAuth.auth && (
        <Admin
          createPost={createPost}
          setCreatePost={setCreatePost}
          showHide={showHide}
          setshowHide={setshowHide}
        />
      )}
      {!userAuth.auth && <Adminlogin />}
    </div>
  );
}
