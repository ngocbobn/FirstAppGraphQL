import mongoose from 'mongoose';

const LyricSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'song'
    }

});

export default mongoose.model('Lyric', LyricSchema);
