import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });
// const API = axios.create({ baseURL: "http://34.219.85.175:5000" });
const API = axios.create({ baseURL: "https://www.travelbag.tk" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/post/${id}`);
export const fetchPosts = (page) => API.get(`/post?page=${page}`);
export const fetchPostsByCreator = (name) => API.get(`/post/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post("/post", newPost);
export const likePost = (id) => API.patch(`/post/${id}/likePost`);
export const comment = (value, id) => API.post(`/post/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/post/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/post/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
