import CommentService from "../services/comment-service.js";

const commentService = new CommentService();

export const createComment = async (req, res) => {
  console.log("Inside create comment", req.user);
  try {
    const response = await commentService.createComment(
      req.query.modelId,
      req.query.modelType,
      req.user.id,
      req.body.content
    );
    // console.log(response);
    return res.status(200).json({
      success: true,
      data: response,
      err: {},
      message: "Successfully created a comment",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {},
      err: error,
      message: "Something went wrong",
    });
  }
};
