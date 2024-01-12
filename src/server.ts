import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from '../config/db';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { expressMiddleware } from '@apollo/server/express4';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { authService } from './services/AuthService';
import { resolversArray } from './resolvers/_indexResolvers';
import { loadGraphQLFiles } from './utils/graphqlLoader';
import { cronMassMessage } from './utils/cronMassMessage';
import WebSocket from 'ws'

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

const httpServer = createServer(app);

const typeDefs = loadGraphQLFiles();

const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query: {...resolversArray.Query},
        Mutation: {...resolversArray.Mutation},
    },
});

// const wsClient = new WebSocket('wss://ws2.onlyfans.com/ws2/');

// wsClient.on('open', () => {
//     console.log('Connected to ws2.onlyfans.com');
//     wsClient.send("{\"act\": \"connect\", \"token\": \"\"}");
// });

// wsClient.on('close', () => {
//     console.log('Disconnected from ws2.onlyfans.com');
// });
// // send to websocket (create new on send or use "open")
// wsClient.on('message', function incoming(data) {
//     console.log('message:', data.toString());
// });

// wsClient.on('error', (error) => {
//     console.error('WebSocket error:', error);
// });

let curSocket: any;

async function sendHeartbeat() {
    console.log("Sending Heartbeat...");
    curSocket.send(JSON.stringify({act: "get_onlines", ids: []}));

    setTimeout(sendHeartbeat, 20000);   // for every 20s
}

async function connectToWebSocket(url: any, token: any, client: any) {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket(url);

        socket.on('open', async () => {
            console.log("WebSocket connection established");

            try {
                console.log("Sending connect message");
                socket.send(JSON.stringify({ act: "connect", token }));

                socket.on('message', function incoming(data: any) {
                    const msg = JSON.parse(data);
                    console.log('msg:', data.toString());
                    // console.log('msg.connected:', msg.connected);
                    
                    // Processing a received message
                    if (msg.connected === true) {
                        // Logic for processing a connected message
                        console.log("Connected!");
                        curSocket = socket;
                        setTimeout(sendHeartbeat, 20000);
                        resolve(socket);
                    }
                });

                // Additional error handling and connection closures
                socket.on('error', (error) => {
                    reject(error);
                });

                socket.on('close', () => {
                    console.log("WebSocket connection closed");
                });
            } catch (error) {
                reject(error);
            }
        });
    });
}

// Using the function
const url = 'wss://ws2.onlyfans.com/ws2/';
const token = '';  // Replace with your token
const client = {};  // Replace with your client object
connectToWebSocket(url, token, client)
    .then(socket => {
        // Logic after successful connection
    })
    .catch(error => {
        console.error("Error in WebSocket connection:", error);
    });

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

cronMassMessage();

async function startServer() {
    await server.start();

    app.use('/graphql', cors(), expressMiddleware(server, {
        context: async ({ req }) => {
            const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
            let currentUser = null;

            if (token) {
                currentUser = authService.getDataFromToken(token);
            }

            return { token, currentUser };
        },
    }));


    httpServer.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();
