import Sheet from "../models/Sheet.js";

// ✅ Admin creates a new sheet
export const createSheet = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    const sheet = await Sheet.create({
      title,
      description,
      image: image || "", // ✅ optional image URL
    });

    res.status(201).json({
      success: true,
      message: "✅ Sheet created successfully",
      sheet,
    });
  } catch (error) {
    console.error("Create Sheet Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ✅ Get all sheets (Public)
export const getAllSheets = async (req, res) => {
  try {
    const sheets = await Sheet.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sheets.length,
      sheets,
    });
  } catch (error) {
    console.error("Get Sheets Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Admin deletes a sheet
export const deleteSheet = async (req, res) => {
  try {
    const { id } = req.params;

    const sheet = await Sheet.findById(id);

    if (!sheet) {
      return res.status(404).json({ message: "Sheet not found" });
    }

    await sheet.deleteOne();

    res.status(200).json({
      success: true,
      message: "✅ Sheet deleted successfully",
    });
  } catch (error) {
    console.error("Delete Sheet Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get single sheet by ID (Public)
export const getSingleSheet = async (req, res) => {
  try {
    const { id } = req.params;

    const sheet = await Sheet.findById(id);

    if (!sheet) {
      return res.status(404).json({ message: "Sheet not found" });
    }

    res.status(200).json({
      success: true,
      sheet,
    });
  } catch (error) {
    console.error("Get Single Sheet Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

