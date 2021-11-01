import { useState } from "react";
import "./comment-form.scss";
export default function CommentForm({ id, setnewComment }) {
  const [comment, setComment] = useState({ username: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    };
    fetch(`/posts/${id}/comments`, requestOptions)
      .then((response) => response.json())
      .then(() => setnewComment((prevCheck) => !prevCheck))
      .then(() => {
        e.target.reset();
      });
  };

  const handleInput = (e) => {
    let { name, value } = e.target;
    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="commentForm-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-body">
          <h2>Leave a comment</h2>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" onChange={handleInput} required />
          <label htmlFor="content">Comment</label>
          <input
            type="text-area"
            name="content"
            onChange={handleInput}
            required
          />
          <button type="submit">Submit</button>{" "}
        </div>
      </form>
    </div>
  );
}
