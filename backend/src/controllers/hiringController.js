const { StatusCodes } = require("http-status-codes");
const { HiringService } = require("../services");

async function createHiring(req, res, next) {
  try {
    const post = await HiringService.createHiring(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Hiring post created successfully",
      error: {},
      data: post,
    });
  } catch (error) {
    next(error);
  }
}
async function deletePost(req, res, next) {
  try {
    const postId = req.params.id;
    const deletedPost = await HiringService.deletePosts(postId);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Hiring post deleted successfully",
      error: {},
      data: deletedPost,
    });
  } catch (error) {
    next(error);
  }
}
async function getHiringPosts(req, res, next) {
  try {
    const { all } = req.query;
    const role = req.user.role;
    const department = req.user.department;

    const query = { ...req.query };

    // If student & not explicitly requesting all posts
    if (role === "student" && all !== "true" && !req.query.departments) {
      query.departments = department; // Use default only if they didn't filter manually
    }

    console.log("🟦 CONTROLLER LOG:");
    console.log("User:", req.user);
    console.log("Query Params Received:", req.query);
    console.log("Final Query Sent to Service:", query);

    const posts = await HiringService.getAllHiring(query);
    console.log("Posts Received from Service:", posts.length);
    return res.status(200).json({
      success: true,
      message: "Hiring posts fetched successfully",
      error: {},
      data: posts,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createHiring,
  getHiringPosts,
  deletePost,
  // deleteExpiredHiringPosts,
  // getAllHiring,
};
