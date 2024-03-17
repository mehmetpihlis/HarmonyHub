import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, updatePost } from "../axios/index";
import FileBase64 from "react-file-base64";

const UpdateScreen = () => {
  // Post ID
  const { id } = useParams();

  const navigate = useNavigate();


  const [postInfo, setPostInfo] = useState({
    title: "???$$$&&&*/-++^^^^#!:)",
    content: "",
    image: "",
  });

  useEffect(() => {
    getPost(id)
      .then((res) => {
        const post = res.data;
        setPostInfo({
          title: post.title,
          content: post.content,
          image: post.image,
        });
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  useEffect(() => {
    console.log(postInfo);
  }, [postInfo]);

  return (
    <div className="py-5">
      <div className="pb-5 text-center">
        <h1>Update Post</h1>
      </div>
      {postInfo.title === "???$$$&&&*/-++^^^^#!:)" ? (
        <div className="text-center">
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
      ) : (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updatePost(id, postInfo)
                .then(() => {
                  alert("Post Bilgisi Güncellendi!");
                  navigate("/");
                })
                .catch((err) => console.log(err.message));
            }}
          >
            <div className="mb-4">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={postInfo.title}
                onChange={(e) =>
                  setPostInfo({
                    ...postInfo,
                    title: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label fw-bold"
              >
                Content
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={postInfo.content}
                onChange={(e) =>
                  setPostInfo({
                    ...postInfo,
                    content: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label fw-bold"
              >
                Image
              </label>{" "}
              <br />
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostInfo({
                    ...postInfo,
                    image: base64,
                  })
                }
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Update
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateScreen;
