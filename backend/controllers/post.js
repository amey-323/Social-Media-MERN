const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
    try {

        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: "req.body.image.public_id",
                url: "req.body.image.url"
            },
            owner: req.user._id,
            createdAt: Date.now(),
        }
        console.log(newPostData);

        const post = await Post.create(newPostData);
        const user = await User.findById(req.user._id);

        user.posts.push(post._id);

        await user.save();
        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: post
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }
        await post.remove();

        const user = await User.findById(req.user._id);
        const index = user.posts.indexOf(post._id);
        user.posts.splice(index, 1);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.likeAndUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        if (post.likes.toString().includes(req.user._id.toString())) {
            let index = post.likes.indexOf(req.user._id);
            post.likes.splice(index, 1);

            await post.save();
            res.status(200).json({
                success: true,
                message: 'Post unliked',
                post: post
            });
        }
        else {
            post.likes.push(req.user._id);

            await post.save();
            res.status(200).json({
                success: true,
                message: 'Post liked',
                post: post
            });
        }

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getPostOfFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const posts = await Post.find(
            { owner: 
                { $in: user.following } 
            }).populate("owner likes comments.user");
        res.status(200).json({
            success: true,
            message: 'Posts fetched successfully',
            posts:posts
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.updateCaption = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }
        post.caption = req.body.caption;
        await post.save();
        res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            post: post
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.commentOnPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        let commonIndex=-1;
        //Check if comment already exists
        post.comment.forEach((item,index)=>{
            if(item.user.toString()===req.user._id.toString()){
                commonIndex=index;
            }
        });
        if(commonIndex!==-1){
            post.comments[commonIndex].comment=req.body.comment;

            await post.save();
            res.status(200).json({
                success: true,
                message: 'Comment Updated successfully',
                post: post
            });
        }else{
            post.comments.push({
                comment: req.body.comment,
                user: req.user._id,
                postedAt: Date.now()
            });
            await post.save();
            res.status(200).json({
                success: true,
                message: 'Comment added'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}