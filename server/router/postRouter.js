import express from "express";
import postModel from "../model/postModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET Posts
router.get("/", async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error.message);
        res.status(404).json(error);
    }
});

// GET Post
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Bu ID'ye sahip bir post bulunamadı"
            });
        };

        res.status(200).json(post);
    } catch (error) {
        console.log(error.message);
        res.status(404).json(error);
    }
});

// Create post
router.post("/", auth ,async (req, res) => {
    try {
        const post = req.body;

        console.log(`CreatorID: ${req.creatorId}`)

        const newPost = await postModel.create({
            ...post,
            creatorId: req.creatorId
        });
        res.status(201).json(newPost);
        console.log(newPost);
    } catch (error) {
        console.log(error.message);
        res.status(404).json(error);
    }
}); 

// Update post
router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        console.log(req.creatorId);
        console.log(req.body.creatorId);

        if (req.creatorId !== req.body.creatorId) {
            return res.status(403).json({ message: "Yetkisiz" });
        }

        const updatedPost = await postModel.findByIdAndUpdate(id, {
            ...req.body
        }, {new:true});

        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error.message);
        res.status(404).json(error);
    }
});

// Delete Post
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await postModel.findByIdAndDelete(id);

        res.status(200).json(deletedPost);
    } catch (error) {
        console.log(error.message);
        res.status(404).json(error);
    }
})


export default router;