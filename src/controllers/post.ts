import url from 'url';

import { Post, Posts } from "../models/Post";
import { Request, Response, NextFunction } from "express";
import { getPagination, getPaginationData} from "../utils/pagination"


exports.getPosts = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user.id) {
    return res.status(400).json({ message: "Something went wrong" });
  }

  // Set the url object to any so that we can converty it to a queryParams afterwards 
  // (otherwise the default strings on sortProp and sortType would not work)
  const query: any = url.parse(req.url, true).query;
  const { page = 1, size = 15, sortProp = 'published_date', sortType = 'DESC' }: queryParams = query;
  const { limit, offset } = getPagination(page, size);

  try {
    const data: any = await Post.findAndCountAll({
      where: { user_id: req.user.id, deleted: 0 },
      limit,
      offset,
      order: [[sortProp, sortType], ["createdAt", sortType]],
    });

    res.status(200).json(getPaginationData(data, page, limit));
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;

  try {
    const post: Post = await Post.findByPk(postId);

    if (!post) {
      const error = new Error("The post cannot be found");
      error.statusCode = 404;
      throw error;
    }

    if (post.user_id !== req.user.id) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }

    res.status(200).json({ data: { ...post.toJSON() }});
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.createPost = (req: Request, res: Response, next: NextFunction) => {
  const newPost = Post.build({
    user_id: req.user.id,
    status: req.body.status || 0,
    title: req.body.title,
    ingress: req.body.ingress || "",
    content: req.body.content,
    published_date: req.body.published_date || Date.now(),
  });

  return newPost
    .save()
    .then((post) => {
      res.status(201).json({ data: { ...post.toJSON() }});
    })
    .catch((err) => next(err));
};

exports.editPost = async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.params.postId;

  try {
    const post: Post = await Post.findByPk(postId);

    if (!post) {
      const error = new Error("The post cannot be found");
      error.statusCode = 404;
      throw error;
    }

    if (post.user_id !== req.user.id) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }

    post.title = req.body.title;
    post.ingress = req.body.ingress || post.ingress;
    post.content = req.body.content;
    post.status = req.body.status || post.status;
    post.deleted = req.body.deleted || post.deleted;
    post.published_date = req.body.published_date || post.published_date;

    const savedPost = await post.save();

    if (!savedPost) {
      const error = new Error("The post could not be updated");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({ data: { ...post.toJSON() }});
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.deletePost = async (req, res, next: NextFunction) => {
  const postId = req.params.postId;

  try {
    const post: Post = await Post.findByPk(postId);

    if (!post) {
      const error = new Error("The post cannot be found");
      error.statusCode = 404;
      throw error;
    }

    if (post.user_id !== req.user.id) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      throw error;
    }

    const deletedPost = await Post.destroy({
      where: { id: postId },
    }).catch(e => console.log(e));

    if (!deletedPost) {
      const error = new Error("The post could not be deleted");
      error.statusCode = 400;
      throw error;
    }

    res.status(204);
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};
