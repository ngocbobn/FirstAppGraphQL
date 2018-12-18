const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some'

function getUserId(context) {
  const token = context.request.get('Authorization')
  if (token) {
    const verify = jwt.verify(token, APP_SECRET)
    const { userId } = verify;
    return userId
  }

  throw new Error('Not authenticated')
}

export {
  APP_SECRET,
  getUserId
}
