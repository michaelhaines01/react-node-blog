import React, { useContext } from "react";
import { AuthContext } from "../../../GlobalStates";
import "./confirmpublishpost.scss";
export default function ConfirmPublish({
  setConfirmPublish,
  setshowHide,
  confirmPublish,
}) {
  const [userAuth] = useContext(AuthContext);
  const handleCancel = () => {
    setConfirmPublish(false);
    setshowHide(false);
  };

  const handlePublish = () => {
    setshowHide(false);

    const requestOptions = {
      method: "POST",
      headers: {
        "Authorization": `${userAuth.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(confirmPublish),
    };
    fetch(`admin/publish/${confirmPublish.publishId}`, requestOptions)
      .then((res) => console.log(res.json()))
      .then(() => setConfirmPublish(false));
  };

  return (
    <div className="publish-container">
      <h1>Are you sure you want to Publish</h1>
      <div>
        <button onClick={handlePublish}>Confirm</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}
