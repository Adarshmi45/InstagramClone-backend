const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST")

router.get("/allposts", requireLogin, (req, res) => {
    POST.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy","_id name")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})

router.post("/createPost", requireLogin, (req, res) => {
    const { body, pic } = req.body;
    console.log(pic)
    if (!body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    console.log(req.user)
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})

router.get("/myposts", requireLogin, (req, res) => {
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(myposts => {
            res.json(myposts)
        })
})

router.put("/like", requireLogin, async (req, res) => {
    try {
        const result = await POST.findByIdAndUpdate(
            req.body.postId,
            { $push: { likes: req.user._id } },
            { new: true }
        );
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});

router.put("/unlike", requireLogin, async (req, res) => {
    try {
        const result = await POST.findByIdAndUpdate(
            req.body.postId,
            { $pull: { likes: req.user._id } },
            { new: true }
        );
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});

router.put("/comment", requireLogin, async (req, res) => {
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    };

    try {
        const result = await POST.findByIdAndUpdate(
            req.body.postId,
            { $push: { comments: comment } },
            { new: true }
        )
        .populate("comments.postedBy", "_id name")
        .populate("postedBy","_id name")

        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});



module.exports = router