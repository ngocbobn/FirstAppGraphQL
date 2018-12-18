import jwt from 'jsonwebtoken'
import { APP_SECRET, getUserId } from '../utils'
import User from '../models/user';
import Song from '../models/song';
import pubsub from '../pubsub';

function signup(parent, args, ctx, info) {
  const { username, password } = args
  const user = new User({ username, password });
  if (!username || !password) { throw new Error('You must provide an username and password.'); }

  return User.findOne({ username })
    .then(existingUser => {
      if (existingUser) { throw new Error('Username in use'); }
      return user.save();
    })
    .then(user => {
      const token = jwt.sign({ userId: user.id, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, APP_SECRET)
      return {
        token
      }
    });
}

function login(parent, args, ctx, info) {
  const { username, password } = args;
  return User.findOne({ username })
    .then(user => {
      if (!user) { throw new Error('username or password not correct'); }
      return user.comparePassword(password)
        .then((res) => {
          if (!res) { throw new Error('username or password not correct'); }
          const token = jwt.sign({ userId: user.id, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, APP_SECRET)
          return {
            token
          }
        })
    })
}

function createNewSong(parent, args, ctx, info) {
  const userId = getUserId(ctx)
  const song = new Song({ title: args.title, user: userId })
  return song.save()
    .then((result) => {
      pubsub.publish('createNewSongSub', {
        newSong: result
      });
      return {
        id: result._id,
        title: result.title,
        likes: result.likes
      }
    })
    .catch(e => { throw Error(e.message) })
}

function likeSong(parent, args, ctx, info) {
  return Song.likeSong(args.id).then((result) => {
    console.log(result)
    pubsub.publish('likeSongSub', {
      updateSong: result
    });
  })
}

export default {
  signup,
  login,
  createNewSong,
  likeSong
}
