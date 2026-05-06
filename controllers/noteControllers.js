import Note from "../models/note.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    await Note.create({ title: title, content: content, category });
    res.status(201).json({ message: "Note Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    // Logic: Handle invalid MongoDB IDs specifically
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id, title, content, category } = req.body;
    const existingNote = await Note.findById(id);
    if (!existingNote) {
      return res.status(400).json({ message: "Not Found" });
    }
    existingNote.title = title || existingNote.title;
    existingNote.content = content || existingNote.content;
    existingNote.category = category || existingNote.category;
    const updatedNote = await existingNote.save();
    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSearchList = async (req, res) => {
  try {
    const { title, category } = req.query;
    let checkList = {};
    if (title) {
      // The $regex logic means "find if the title contains these letters"
      // The "i" means "ignore if it's uppercase or lowercase"
      checkList.title = { $regex: title, $options: "i" };
    }
    if (category) {
      checkList.category = category;
    }
    const results = await Note.find(checkList).sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};
