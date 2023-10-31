const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { upload } = require("../utils/fileUpload");

router.post("/", upload.single("image"), bookController.createBook);
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.patch("/:id", upload.single("image"), bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
