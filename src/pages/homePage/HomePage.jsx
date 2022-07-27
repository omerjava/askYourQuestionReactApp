import React, { useEffect, useState } from "react";
import { postApiCall } from "../../api-calls/post-api-calls";
import FilterBar from "../../components/filterBar/FilterBar";
import PostCard from "../../components/postCard/PostCard";
import PostForm from "../../components/postForm/PostForm";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import CommentForm from "../../components/commentForm/CommentForm";

function HomePage() {
  const [postList, setPostList] = useState([]);
  const [errorPostCard, setErrorPostCard] = useState("");

  const {
    newComment,
    newPost,
    updatePost,
    updatedComment,
    newCommentDelete,
    newPostDelete,
    usernameLoggedIn,
  } = useContext(AllContext);

  const getPosts = () => {
    const response = postApiCall.getAll();

    response
      .then((res) => {
        if (res.ok) {
          setErrorPostCard("");
          return res.json();
        } else
          setErrorPostCard(
            "Sorry, there is network problem! We can't get data!"
          );
      })
      .then((data) => {
        setPostList(data.reverse());
      }).catch((err) => setErrorPostCard(err));
  };

  useEffect(() => {
    getPosts();
  }, [newPost, updatePost, newComment, updatedComment, newCommentDelete, newPostDelete]);

  return (
    <div className="homepage">
      <FilterBar />
      <PostForm />
      {postList !== null && postList !== undefined && postList.length !== 0
        ? postList.map((v, i) => (
            <PostCard
              key={v.id}
              username={v.userName}
              booleanPost={v.userName === usernameLoggedIn}
              titlePost={v.title}
              post={v.text}
              like={v.postLikes}
              error={errorPostCard}
              postId={v.id}
              titleEdit={v.title}
              textEdit={v.text}
              postIdForUpdate={v.id}
              postIdForPostDelete={v.id}
              datePost={v.createDate.substring(0,10)}
              commentForm={<CommentForm postIdForComment={v.id} />}
            />
          ))
        : ""}
    </div>
  );
}

export default HomePage;
