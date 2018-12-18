import pubsub from '../pubsub';

const createNewSongSub = {
  subscribe: () => pubsub.asyncIterator('createNewSongSub'),
  resolve: (payload) => {
    return {
      id: payload.newSong._id,
      title: payload.newSong.title,
      likes: payload.newSong.likes
    }
  }
}

const likeSongSub = {
  subscribe: () => pubsub.asyncIterator('likeSongSub'),
  resolve: (payload) => {
    return {
      id: payload.updateSong._id,
      title: payload.updateSong.title,
      likes: payload.updateSong.likes
    }
  }
}

export default {
  createNewSongSub,
  likeSongSub
}
