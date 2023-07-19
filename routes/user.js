const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys");
const requireLogin = require("../middlewares/requireLogin");



router.get('/user', requireLogin, (req, res) => {
    USER.findById(req.user._id)
      .select('-password')
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
});


router.get("/user/:id", async (req, res) => {
    try {
        const user = await USER.findOne({ _id: req.params.id }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const posts = await POST.find({ postedBy: req.params.id }).populate("postedBy", "_id");
        res.status(200).json({ user, posts });
    } catch (err) {
        return res.status(422).json({ error: err.message });
    }
});

router.put('/follow', requireLogin, async (req, res) => {
    try {
        const updatedUser = await USER.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.user._id } },
            { new: true }
        ).exec();

        await USER.findByIdAndUpdate(
            req.user._id,
            { $push: { following: req.body.followId } },
            { new: true }
        ).exec();

        res.json(updatedUser);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});

router.put('/unfollow', requireLogin, async (req, res) => {
    try {
        const updatedUser = await USER.findByIdAndUpdate(
            req.body.followId,
            { $pull: { followers: req.user._id } },
            { new: true }
        ).exec();

        await USER.findByIdAndUpdate(
            req.user._id,
            { $pull: { following: req.body.followId } },
            { new: true }
        ).exec();

        res.json(updatedUser);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});

router.put("/uploadProfilePic", requireLogin, async (req, res) => {
    try {
        const result = await USER.findByIdAndUpdate(
            req.user._id,
            { $set: { Photo: req.body.pic } },
            { new: true }
        );
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});








module.exports = router;