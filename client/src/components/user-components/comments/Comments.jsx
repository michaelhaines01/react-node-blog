import { useEffect, useState } from "react";
import Commentform from "../comment-form/Commentform";
import "./comments.scss";
import Formatdate from "../../format-date/Formatdate";
export default function Comments(props) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(false);

  useEffect(() => {
    fetch(`/posts/${props.id}/comments`).then((res) =>
      res.json().then((comments) => setComments(comments))
    );
  }, [newComment, props.id]);

  console.log(newComment);
  return (
    <div className="comment-container">
      {comments.map((comments) => (
        <div className="comment-body" key={comments._id}>
          <div className="comment-top">
            <h4>{comments.username}</h4>
            <h6>
              <Formatdate timestamp={comments.timestamp} />
            </h6>
          </div>
          <p>{comments.content}</p>
        </div>
      ))}
      <Commentform id={props.id} setnewComment={setNewComment} />
    </div>
  );
}
