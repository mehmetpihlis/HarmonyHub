import React, { useState, useEffect } from "react";
import { getPosts } from "../axios/index";
import PostsList from "../components/PostsList";
import { deletePost } from "../axios/index";

function HomeScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        alert("Post Silindi");
        setPosts(posts.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="py-5 mb-5">
      {posts.length ? (
        <PostsList posts={posts} handleDelete={handleDelete} />
      ) : (
        <div className="mt-5 d-flex justify-content-center align-items-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
