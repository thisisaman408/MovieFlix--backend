import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

const create = async (req, res) => {
  try {
    const { mediaId, mediaType, mediaTitle, mediaPoster, content } = req.body;

    const review = new reviewModel({
      user: req.user.id,
      mediaId,
      mediaType,
      mediaTitle,
      mediaPoster,
      content
    });

    await review.save();

    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user
    });
  } catch (err) {
    console.error("Review creation error:", err);
    responseHandler.error(res);
  }
};

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id
    });

    if (!review) return responseHandler.notfound(res);

    await review.remove();

    responseHandler.ok(res);
  } catch (err) {
    console.error("Review deletion error:", err);
    responseHandler.error(res);
  }
};

const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel.find({
      user: req.user.id
    }).populate("user").sort("-createdAt");

    responseHandler.ok(res, reviews);
  } catch (err) {
    console.error("Get reviews error:", err);
    responseHandler.error(res);
  }
};

export default { create, remove, getReviewsOfUser };