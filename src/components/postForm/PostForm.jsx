import React, { useState } from "react";
import { postApiCall } from "../../api-calls/post-api-calls";
import "./PostForm.css";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

function PostForm(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errorPostForm, setErrorPostForm] = useState("");
  
  const { newPost, setNewPost, loggedIn } = useContext(AllContext);

  const postCreateHandle = (e, title, text) => {
    e.preventDefault();

    if(!loggedIn){
      setErrorPostForm("Please Login!");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId || !title || !text) {
      setErrorPostForm("Invalid or missing input!");
      return;
    }

    const response = postApiCall.create(text, title, userId);

    if(response==="No Token!") setErrorPostForm("You need to Login!");

    response
      .then((res) => {
        if (res.ok) {
          setErrorPostForm("");
          setText("");
          setTitle("");
          setNewPost(newPost+1);
          return;
        } else setErrorPostForm("Sorry, there is a network problem!");
      }).catch((err) => setErrorPostForm(err.message));
  };

  return (
    <div className="postForm">
      <form onSubmit={(e) => postCreateHandle(e, title, text)}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Write your question.."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Ask Your Question</button>
        </div>
        <div className="errorPostForm">{errorPostForm}</div>
      </form>
    </div>
  );
}

export default PostForm;
