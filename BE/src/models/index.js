import mongoose from 'mongoose';
import User from './user';
import Song from './song'
import Lyric from './lyric'

// SET UP Mongoose Promises.
mongoose.Promise = global.Promise;

export const startDB = ({ user, pwd, url, db }) => mongoose.connect(`mongodb://${user}:${pwd}@${url}/${db}`, { keepAlive: true, useNewUrlParser: true, useCreateIndex: true });
  
export const models = {
  User,
  Song,
  Lyric
}
