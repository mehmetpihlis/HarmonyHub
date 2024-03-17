import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { createPost } from "../axios/index";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CreateScreen() {
  const navigate = useNavigate();

  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
    image: "",
    creatorName: ""
  });

  useEffect(() => {
    setPostInfo({
      ...postInfo,
      creatorName: JSON.parse(localStorage.getItem("userAccess"))?.user?.fullName
    });

    console.log(postInfo)
  }, []);

  return (
    <div className="py-5">
      <div className="pb-5 text-center">
        <h1>Create a post...</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost(postInfo)
            .then(() => {
              alert("Post Oluşturuldu");
              navigate("/");
            })
            .catch((err) => console.log(err));
        }}
      >
        <div className="mb-4">
          <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
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
          <label htmlFor="exampleInputPassword1" className="form-label fw-bold">
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
          <label htmlFor="exampleInputPassword1" className="form-label fw-bold">
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
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateScreen;
