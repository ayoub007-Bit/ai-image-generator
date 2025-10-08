import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    prompt:{
        type: String,
        required: true
    },

    photo:{
        type: String,
        required: true
    }
},{
    timestamps: true //createdAt , updatedAt
})

const Post = mongoose.model("Posts", postSchema);

export default Post;

