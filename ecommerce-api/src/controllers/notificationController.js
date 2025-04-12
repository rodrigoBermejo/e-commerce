const Notification = require("../models/notification");
const errorHandler = require("../middlewares/errorHandler");

exports.getNotificationsByUserId = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    });
    res.status(200).json(notifications);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.createNotification = async (req, res, next) => {
  const { userId, message } = req.body;

  try {
    const newNotification = new Notification({
      userId,
      message,
    });

    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
