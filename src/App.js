import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AllContext } from "./context/AllContext";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import { userApiCall } from "./api-calls/user-api-calls";
import { getToken } from "./logic/getToken";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [usernameLoggedIn, setUsernameLoggedIn] = useState(null);
  const [newPost, setNewPost] = useState(1);
  const [newComment, setNewComment] = useState(1);
  const [updatePost, setUpdatePost] = useState(1);
  const [updatedComment, setUpdatedComment] = useState(1);
  const [newCommentDelete, setNewCommentDelete] = useState(1);
  const [newPostDelete, setNewPostDelete] = useState(1);

  const isLoggedIn = async () => {
    const accessToken = await getToken();

    if (accessToken) setLoggedIn(true);
    else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const userInfo = async () => {
    const userId = localStorage.getItem("userId");
    if(!userId){
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("expirationDate");
      setLoggedIn(false);
      setUsernameLoggedIn(null);
      return;
    }

    const response = userApiCall.getUserById(userId);

    if(response==="No Token!") {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("expirationDate");
      setLoggedIn(false);
      setUsernameLoggedIn(null);
      return;
    }

    response
      .then((res) => {
        if (res.ok) return res.json();
        else {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("expirationDate");
          setUsernameLoggedIn(null);
          setLoggedIn(false);
          return;
        }
      })
      .then((data) => {
        setUsernameLoggedIn(data.userName);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    userInfo();
  }, [loggedIn]);


  return (
    <div className="App">
      <AllContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          usernameLoggedIn,
          setUsernameLoggedIn,
          newPost, setNewPost,
          newComment, setNewComment,
          updatePost, setUpdatePost,
          updatedComment, setUpdatedComment,
          newCommentDelete, setNewCommentDelete,
          newPostDelete, setNewPostDelete
        }}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/register" exact element={<RegisterPage />} />
          </Routes>
        </Router>
      </AllContext.Provider>
    </div>
  );
}

export default App;
