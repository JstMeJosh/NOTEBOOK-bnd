import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getSearchList,
  updateNote,
  getNoteById,
} from "../controllers/noteControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/search", getSearchList);
router.post("/create", createNote);
router.put("/update", updateNote);
router.delete("/delete/:id", deleteNote);
router.get("/:id", getNoteById);
export default router;
