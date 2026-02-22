const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth");

// POST /api/messages — public (contact form)
router.post("/", async (req, res) => {
  try {
    const message = await Message.create(req.body);
    const n8nRes = await fetch("https://n8n.raigrc.com/webhook/new-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...req.body, _id: message._id }),
    });

    console.log("n8n response status:", n8nRes.status);
    const responseText = await n8nRes.text();
    console.log("n8n response body:", responseText);

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/messages — protected (admin view)
router.get("/", auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/messages/:id/read — protected
router.patch("/:id/read", auth, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/messages/:id — protected
router.delete("/:id", auth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
