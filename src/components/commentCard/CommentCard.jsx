import React, { useState } from "react";
import { commentApiCall } from "../../api-calls/comment-api-calls";
import CommentEditForm from "../commentEditForm/CommentEditForm";
import "./CommentCard.css";
import { AllContext } from "../../context/AllContext";
import { useContext } from "react";

function CommentCard(props) {
  const [showEditCommentForm, setShowEditCommentForm] = useState(false);
  const [errorCommentDelete, setErrorCommentDelete] = useState("");

  const { newCommentDelete, setNewCommentDelete, loggedIn } =
    useContext(AllContext);

  // delete  comment

  const deleteCommentHandle = (e, commentId) => {
    e.preventDefault();

    if (!loggedIn) {
      setErrorCommentDelete("Please Login!");
      return;
    }

    if (!commentId) {
      setErrorCommentDelete("Invalid or missing input!");
      return;
    }

    const response = commentApiCall.delete(commentId);

    if (response === "No Token!") setErrorCommentDelete("You need to Login!");

    response
      .then((res) => {
        if (res.ok) {
          setErrorCommentDelete("Your Comment is deleted!");
          setNewCommentDelete(newCommentDelete + 1);
        } else setErrorCommentDelete("Sorry, there is a network problem!");
      })
      .catch((err) => setErrorCommentDelete(err));
  };

  return (
    <div className="commentCard">
      <div className="common commentHeader">
        <div>{props.usernameComment}</div>
      </div>
      <div className="common commentBody">{props.comment}</div>
      <div className="common commentFooter">
        <div className="dateComment">{props.dateComment}</div>
        <div className="btnCommentCard">
          <div
            className={props.booleanComment ? "edit" : "no-edit"}
            onClick={() => setShowEditCommentForm(!showEditCommentForm)}
          >
            Edit
          </div>
          <div
            className={props.booleanComment ? "delete" : "no-delete"}
            onClick={(e) => deleteCommentHandle(e, props.commentIdForDelete)}
          >
            Delete
          </div>
        </div>
      </div>
      {errorCommentDelete}
      {props.error}
      <div
        className={
          showEditCommentForm ? "commentEditForm" : "no-commentEditForm"
        }
      >
        <CommentEditForm
          commentIdForCommentEdit={props.commentIdForCommentEdit}
          defaultValue={props.defaultValue}
        />
      </div>
    </div>
  );
}

export default CommentCard;
