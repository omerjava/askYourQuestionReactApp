import React, { useState } from "react";
import { postApiCall } from "../../api-calls/post-api-calls";
import "./PostEditForm.css";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

function PostEditForm(props) {
  const [title, setTitle] = useState(props.titleEdit);
  const [text, setText] = useState(props.textEdit);
  const [errorPostEditForm, setErrorPostEditForm] = useState("");

  const { updatePost, setUpdatePost, loggedIn } = useContext(AllContext);

  const postUpdateHandle = (e, title, text, postId) => {
    e.preventDefault();

    if(!loggedIn){
      setErrorPostEditForm("Please Login!");
      return;
    }

    if (!postId || !title || !text) {
      setErrorPostEditForm("Invalid or missing input!");
      return;
    }

    const response = postApiCall.update(title, text, postId);

    if(response==="No Token!") setErrorPostEditForm("You need to Login!");

    response
      .then((res) => {
        if (res.ok) {
          setErrorPostEditForm("Your post is updated!");
          setText("");
          setTitle("");
          setUpdatePost(updatePost + 1);
          return;
        } else {
          setErrorPostEditForm("Sorry, there is a network problem!");
          return;
        }
      }).catch((err) => setErrorPostEditForm(err));
  };

  return (
    <div className="postEditForm">
      <form
        onSubmit={(e) =>
          postUpdateHandle(
            e,
            title || props.titleEdit,
            text || props.textEdit,
            props.postIdForUpdate
          )
        }
      >
        <div>
          <input
            type="text"
            placeholder="Title"
            defaultValue={props.titleEdit}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Write your question.."
            defaultValue={props.textEdit}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
        {errorPostEditForm}
      </form>
    </div>
  );
}

export default PostEditForm;
