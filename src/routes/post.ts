const postController = require("../controllers/post");
const {
  validateCreatePost,
  validateEditPost,
  validateDeletePost,
} = require("../validators/post");
const { body } = require("express-validator");
const postRoutes = require("express").Router();

postRoutes.get("/", postController.getPosts);
postRoutes.get("/:postId", postController.getPost);
postRoutes.post("/", validateCreatePost, postController.createPost);
postRoutes.put("/:postId", validateEditPost, postController.editPost);
postRoutes.delete("/:postId", validateDeletePost, postController.deletePost);

module.exports = postRoutes;
