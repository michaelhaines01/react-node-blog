import React, { useContext } from "react";
import { AuthContext } from "../../../GlobalStates";
import "./Confirmdelete.scss";
export default function ConfirmDelete({
  setconfirmDelete,
  setshowHide,
  confirmDelete,
}) {
  const [userAuth] = useContext(AuthContext);
  const handleCancel = () => {
    setconfirmDelete(false);
    setshowHide(false);
  };

  const handleDelete = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Authorization": `${userAuth.token}`,
      },
    };
    fetch(`admin/delete/${confirmDelete.deleteId}`, requestOptions)
      .then((res) => console.log(res.json()))
      .then(() => setconfirmDelete(false))
      .then(() => setshowHide(false));
  };
  return (
    <div className="delete-container">
      <h1>Are you sure you want to delete.</h1>
      <div>
        <button onClick={handleDelete}>Confirm</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}
