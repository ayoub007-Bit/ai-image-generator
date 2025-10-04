import mongoose from 'mongoose';

const postShema = new mongoose.Schema({
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

const PostSchema = mongoose.model("Posts", postShema);

export default PostSchema;

