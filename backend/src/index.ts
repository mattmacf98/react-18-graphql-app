import express from "express";
import cors from "cors";
import http from 'http'
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'
import { applyMiddleware } from "graphql-middleware";
import { ApolloServer } from "@apollo/server";

import typeDefs from "./graphql/types";
import resolvers from "./graphql/resolvers";
import models from './models'
import { json } from "body-parser";
import { $server } from "../config";

const app = express();
const corsOptions = {
    origin: "*",
    credentials: true
};
app.use(cors(corsOptions));
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-ALlow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
const httpServer = http.createServer(app);

const schema = applyMiddleware(
    makeExecutableSchema({
        typeDefs: typeDefs,
        resolvers: resolvers
    })
);

const apolloServer = new ApolloServer({
    schema: schema,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer: httpServer})]
});

const main = async () => {
    const alter = true;
    const force = true;
    await apolloServer.start();
    await models.sequelize.sync({alter: alter, force: force});

    app.use(
        "/graphql", 
        cors<cors.CorsRequest>(), 
        json(), 
        expressMiddleware(apolloServer, {
            context: async () => ({models: models})
        })
    );

    await new Promise<void>((resolve) => httpServer.listen({port: $server.port}, resolve));
    console.log(`🚀 Server ready at http://localhost:${$server.port}/graphql`);
}
main();