import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { resolvers } from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
export class Server {
    static async connectDB(mongoURI) {
        return await connect(mongoURI);
    }
    static async connectApollo(typeDefs, resolvers) {
        const server = new ApolloServer({ typeDefs, resolvers });
        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
        });
        return url;
    }
}
const makeDBAndApolloConnection = async () => {
    const mongoURI = process.env.mongoURI;
    if (await Server.connectDB(mongoURI)) {
        const url = await Server.connectApollo(typeDefs, resolvers);
        console.log(url);
    }
};
makeDBAndApolloConnection();
