import React, { useState } from "react";
import "./CommentForm.css";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { commentApiCall } from '../../api-calls/comment-api-calls';


function CommentForm(props) {
  const [comment, setComment] = useState("");
  const [errorCommentForm, setErrorCommentForm] = useState("");

  const { newComment, setNewComment, loggedIn } = useContext(AllContext);

    // create new comment

    const commentCreateHandle = (e, userId, postId, comment) => {
      e.preventDefault();
  
      if(!loggedIn){
        setErrorCommentForm("Please Login!");
        return;
      }
      
      if (!userId || !postId || !comment) {
        setErrorCommentForm("Invalid or missing input!");
        return;
      }
  
      const response = commentApiCall.create(userId, postId, comment);

      if(response==="No Token!") setErrorCommentForm("You need to Login!");
  
      response
        .then((res) => {
          if (res.ok) {
            setErrorCommentForm("Bravo! Your Comment is recorded!");
            setComment("");
            setNewComment(newComment+1);
            return;
          } else {
            setErrorCommentForm("Sorry, there is a network problem!");
            return;
          }
        }).catch((err) => setErrorCommentForm(err.message));
    }

  return (
    <div className="commentForm">
      <form onSubmit={(e) => commentCreateHandle(e, localStorage.getItem("userId"), props.postIdForComment, comment )}>
        <div>
          <textarea
            name="comment"
            id="comment"
            placeholder="Write your comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <button type="submit">Submit Your Comment</button>
        </div>
        {errorCommentForm}
      </form>
    </div>
  );
}

export default CommentForm;
