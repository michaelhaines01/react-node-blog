import "./top-bar.scss";

export default function Topbar() {
  return (
    <div className="topbar ">
      <div className="wrapper">
        <div className="left">
          <a href="/" className="logo">
            Blog
          </a>
        </div>
        <div className="right">
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}
