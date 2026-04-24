import Fee from "../models/Fee.model.js";

// 🔹 Create Fee
export const createFee = async (req, res) => {
  try {
    const { student, amount } = req.body;

    if (!student || !amount) {
      return res.status(400).json({ message: "All fields required" });
    }

    const fee = await Fee.create(req.body);

    res.status(201).json({
      success: true,
      message: "Fee created",
      fee
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get All Fees
export const getFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate("student");

    res.json({
      success: true,
      count: fees.length,
      fees
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Update Fee
export const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Fee updated",
      fee
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Delete Fee
export const deleteFee = async (req, res) => {
  try {
    await Fee.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Fee deleted"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};