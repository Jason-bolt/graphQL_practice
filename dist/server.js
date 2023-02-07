"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const resolvers_1 = require("./graphql/resolvers");
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
class Server {
    static async connectDB(mongoURI) {
        return await (0, mongoose_1.connect)(mongoURI);
    }
    static async connectApollo(typeDefs, resolvers) {
        const server = new server_1.ApolloServer({ typeDefs, resolvers });
        const { url } = await (0, standalone_1.startStandaloneServer)(server, {
            listen: { port: 4000 },
        });
        return url;
    }
}
exports.Server = Server;
const makeDBAndApolloConnection = async () => {
    const mongoURI = process.env.mongoURI;
    if (await Server.connectDB(mongoURI)) {
        const url = await Server.connectApollo(typeDefs_1.default, resolvers_1.resolvers);
        console.log(url);
    }
};
makeDBAndApolloConnection();
