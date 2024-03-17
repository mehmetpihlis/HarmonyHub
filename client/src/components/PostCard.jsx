import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import moment from "moment";

const PostCard = ({ post, handleDelete }) => {
  return (
    <div className="card mb-3 mx-3 p-3 col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <img src={post?.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
        <h6 className="card-text">{post.creatorName}</h6>
        <p className="card-text">
          <small className="text-body-secondary">
            {moment(post.date).fromNow()}
          </small>
        </p>
      </div>
      {post.creatorName ===
      JSON.parse(localStorage.getItem("userAccess"))?.user?.fullName ? (
        <>
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(post._id)}
            >
              <MdDeleteForever size={25} />
            </button>

            <Link to={`/update/${post._id}`} className="btn btn-primary">
              <GrDocumentUpdate size={25} />
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between mt-3">
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
