require('events').EventEmitter.defaultMaxListeners = 0;
import { GraphQLServer } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import { startDB } from './models';


const resolvers = {
  Query,
  Mutation,
  Subscription
}
const db = startDB({
  user: '',
  pwd: '',
  db: 'graphqlYoga',
  url: 'localhost'
})
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db
  }),
})

server.start({ port: 4444 }, () => {
  console.log('Server is running on http://localhost:4444')
})
