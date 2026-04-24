import User from "../models/User.model.js";

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      profile: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminProfile = getProfile;
export const getTeacherProfile = getProfile;
export const getParentProfile = getProfile;
export const getFinanceProfile = getProfile;
