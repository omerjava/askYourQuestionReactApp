import React, { useState } from 'react'
import './CommentEditForm.css'
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { commentApiCall } from '../../api-calls/comment-api-calls';

function CommentEditForm(props) {
    const [comment, setComment] = useState("");
    const [errorCommentEditForm, setErrorCommentEditForm] = useState("");
  
    const {updatedComment, setUpdatedComment, loggedIn} = useContext(AllContext);
  
      // update new comment
  
      const commentUpdateHandle = (e, updatedCommentInput, commentId) => {
        e.preventDefault();
    
        if(!loggedIn) {
          setErrorCommentEditForm("Please Login!");
          return;
        }

        if (!updatedComment || !commentId) {
          setErrorCommentEditForm("Invalid or missing input!");
          return;
        }
    
        const response = commentApiCall.update(updatedCommentInput, commentId);
    
        if(response==="No Token!") setErrorCommentEditForm("You need to Login!");

        response
          .then((res) => {
            if (res.ok) {
              setErrorCommentEditForm("Your Comment is updated!");
              setComment("");
              setUpdatedComment(updatedComment + 1);
              return;
            } else {
              setErrorCommentEditForm("Sorry, there is a network problem!");
              return;
            }
          }).catch((err) => setErrorCommentEditForm(err));
      }
  
    return (
      <div className="commentEditForm">
        <form onSubmit={(e) => commentUpdateHandle(e, comment, props.commentIdForCommentEdit)}>
          <div>
            <textarea
              name="comment"
              id="comment"
              placeholder="Write your comment.."
              defaultValue={props.defaultValue}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <button type="submit">Submit Your Comment</button>
          </div>
          {errorCommentEditForm}
        </form>
      </div>
    );
  }

export default CommentEditForm