import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
    title: {
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
    lyrics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lyric'
    }]

});

SongSchema.statics.likeSong = function likeSong(id) {
    return this.findById(id).then(song=>{
        ++song.likes;
        return song.save()
    })
};

export default mongoose.model('Song', SongSchema);
