import React, { useState } from "react";
import { commentApiCall } from "../../api-calls/comment-api-calls";
import CommentCard from "../commentCard/CommentCard";
import "./PostCard.css";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import PostEditForm from "../postEditForm/PostEditForm";
import { postApiCall } from "../../api-calls/post-api-calls";


function PostCard(props) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [errorGetComments, setErrorGetComments] = useState("");
  const [showEditPostForm, setShowEditPostForm] = useState("");
  const [errorPostDelete, setErrorPostDelete] = useState("");

  const { setNewPostDelete, newPostDelete, usernameLoggedIn, loggedIn } = useContext(AllContext);

  // get all comments of posts

  const getComments = (postId) => {
    const response = commentApiCall.getAll(postId);

    response
      .then((res) => {
        if (res.ok) {
          setErrorGetComments("");
          return res.json();
        } else {
          setErrorGetComments(
            "Sorry, there is a network problem! We couldn't get comments!"
          );
          return;
        }
      })
      .then((data) => {
        setCommentList(data.reverse());
      })
      .catch((err) => setErrorGetComments(err.message));
  };

  // delete a post
  
  const deletePostHandle = (e, postId) => {
    e.preventDefault();

    if(!loggedIn){
      setErrorPostDelete("Please Login!");
      return;
    }

    if (!postId) {
      setErrorPostDelete("Invalid or missing input!");
      return;
    }

    const response = postApiCall.delete(postId);

    if(response==="No Token!") setErrorPostDelete("You need to Login!");

    response
    .then((res) => {
      if (res.ok) {
        setErrorPostDelete("Your Post is deleted!");
        setNewPostDelete(newPostDelete+1);
      } else {
        setErrorPostDelete("Sorry, there is a network problem!");
        return;
      }
    })
    .catch((err) => setErrorPostDelete(err.message));

  };

  return (
    <div className="postCard">
      <div className="common header">
        <div>{props.username}</div>
        <div>{props.titlePost}</div>
      </div>
      <div className="common body">{props.post}</div>
      <div className="common footer">
        <div className="datePost">{props.datePost}</div>
        <div className="buttons">
          <div
            className={props.booleanPost ? "btn edit" : "no-edit"}
            onClick={() => setShowEditPostForm(!showEditPostForm)}
          >
            Edit
          </div>
          <div
            className={props.booleanPost ? "btn delete" : "no-delete"}
            onClick={(e) => deletePostHandle(e, props.postIdForPostDelete)}
          >
            Delete
          </div>
        </div>
        <div className="buttons">
          <div
            className="btn reply"
            onClick={() => setShowCommentForm(!showCommentForm)}
          >
            Reply
          </div>
          <div
            className="btn comments"
            onClick={() => setShowComments(!showComments)}
          >
            <div onClick={() => getComments(props.postId)}>Comments</div>
          </div>
        </div>
      </div>
      {errorPostDelete}
      {props.error}
      <div className={showEditPostForm ? "editPostForm" : "no-editPostForm"}>
        {
          <PostEditForm
            titleEdit={props.titleEdit}
            textEdit={props.textEdit}
            postIdForUpdate={props.postIdForUpdate}
          />
        }
      </div>
      <div className={showCommentForm ? "commentForm" : "no-commentForm"}>
        {props.commentForm}
      </div>
      <div className={showComments ? "commentList" : "no-commentList"}>
        {commentList !== null &&
        commentList !== undefined &&
        commentList.length !== 0
          ? commentList.map((v, i) => (
              <CommentCard
                key={i}
                usernameComment={v.userName}
                booleanComment={v.userName === usernameLoggedIn}
                comment={v.text}
                commentIdForCommentEdit={v.id}
                defaultValue={v.text}
                commentIdForDelete={v.id}
                dateComment={v.createDate.substring(0,10)}
              />
            ))
          : "No comment so far!"}
        {errorGetComments}
      </div>
    </div>
  );
}

export default PostCard;
