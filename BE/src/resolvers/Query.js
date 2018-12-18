import User from '../models/user';
import Song from '../models/song'
function users(parent, args, ctx, info) {
  return User.find({});
}

function songs(parent, args, ctx, info) {
  return Song.find({});
}

function owner(parent, args, ctx, info) {
  console.log('aa')
  return User.findById(parent.user);
}

export default {
  owner,
  users,
  songs
}