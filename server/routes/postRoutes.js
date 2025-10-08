import express from 'express';
import *as dotenv from 'dotenv';

import { v2 as cloudinary } from 'cloudinary'; // cloudinary is a service to store images in the cloud
import Post from '../mongodb/models/post.js';

dotenv.config(); 

const router = express.Router(); // .Router() lets us create modular, mountable route handlers. A router instance is a complete middleware and routing

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

//Get all posts 
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({});

        res.status(200).json({ success: true, data: posts })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
})


//Create a post 
router.post('/', async (req, res) => {
    try {
            const { name, prompt, photo} = req.body;
            const photoUrl = await cloudinary.uploader.upload(photo);

            const newPost = await Post.create({
                name,
                prompt,
                photo: photoUrl.url,
            }) 

            res.status(200).json({ success: true, data: newPost});
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
})

export default router;