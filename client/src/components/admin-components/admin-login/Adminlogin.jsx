import { useContext } from "react";
import { AuthContext } from "../../../GlobalStates";
import "./admin-login.scss";
import baseURL from "../../../config.js";
export default function Adminlogin() {
  const [userAuth, setuserAuth] = useContext(AuthContext);

  const handleInput = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    };
    fetch(`${baseURL}/auth/login`, requestOptions)
      .then((res) => res.json())
      .then((res) =>
        setuserAuth({
          user: res.user,
          auth: res.auth,
          message: res.message,
          token: res.token,
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="adminBody-container">
      <div className={"form-container " + (userAuth.auth && "active")}>
        <h1>Admin Login</h1>
        <form
          onSubmit={(e) => {
            handleInput(e);
          }}
        >
          <input type="text" name="username" placeholder="Username" />
          <input type="text" name="password" placeholder="Password" />
          <h6>{userAuth.message}</h6>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
