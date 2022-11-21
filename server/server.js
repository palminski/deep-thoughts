const express = require('express');
// import Apollo Server
const { ApolloServer } = require('apollo-server-express');
//import type defs
const {typeDefs, resolvers} = require('./schemas');

const db = require('./config/connection');
const {authMiddleware} = require('./utils/auth');
const PORT = process.env.PORT || 3001;

//create new apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Create new instance of apollo se3rver with the graphsql schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  //integrate apollo server with the express application as middleware
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      //log where we can test GQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

//call the function to start the server
startApolloServer(typeDefs,resolvers);


