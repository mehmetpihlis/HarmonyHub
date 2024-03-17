import axios from "axios";

const rootReq = axios.create({
  baseURL: "http://localhost:5000",
});

// Add Interceptor
rootReq.interceptors.request.use((req) => {
  if (localStorage.getItem("userAccess")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userAccess")).accessToken
    }`;
  }
  return req;
});

// GET Posts
export const getPosts = async () => await rootReq.get("/posts");

// GET Post
export const getPost = async (id) => await rootReq.get(`/posts/${id}`);

// DELETE Post
export const deletePost = async (id) => await rootReq.delete(`/posts/${id}`);

// CREATE Post
export const createPost = async (postInfo) =>
  await rootReq.post("/posts", postInfo);

// Update Post
export const updatePost = async (id, postInfo) =>
  await rootReq.put(`/posts/${id}`, postInfo);

// SignUp User
export const createUser = async (userInfo) =>
  await rootReq.post("/users/signup", userInfo);

// SignIn User
export const loginUser = async (userInfo) =>
  await rootReq.post("/users/signin", userInfo);

// LogOut User
export const logOut = async (id) => await rootReq.get(`/users/logout/${id}`);

// Refresh Access Token
export const refreshAccessToken = async (id) =>
  await rootReq.get(`/users/refresh/${id}`);


  
