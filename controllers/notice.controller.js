import Notice from "../models/Notice.model.js";

// 🔹 Create Notice (Admin)
export const createNotice = async (req, res) => {
  try {
    const { title, message, audience } = req.body;

    const notice = await Notice.create({
      title,
      message,
      audience,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Notice created",
      notice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 🔹 Get Notices (Role Based)
export const getNotices = async (req, res) => {
  try {
    const role = req.user.role;

    let notices;

    if (role === "ADMIN") {
      // admin ला सगळे notices
      notices = await Notice.find().sort({ createdAt: -1 });
    } else {
      // role अनुसार filter
      notices = await Notice.find({
        $or: [
          { audience: "ALL" },
          { audience: role }
        ]
      }).sort({ createdAt: -1 });
    }
        
    res.status(200).json({
      success: true,
      count: notices.length,
      notices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};