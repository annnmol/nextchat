import Redis from "ioredis";

const REDIS_HOST = process.env.REDIS_HOST ?? "localhost";
const REDIS_PORT = Number(process.env.REDIS_PORT) ?? 6379;
const REDIS_USERNAME = process.env.REDIS_USERNAME ?? "";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD ?? "";

console.log("REDIS_HOST", REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD);

// Create a Redis client
// const client = Redis.createClient({
//     // Replace with your Redis connection details
//     host: 'localhost',
//     port: 6379,
//     password: 'your-password'
//   })

//   // Create a Redis adapter
//   const adapter = require('socket.io-redis')({
//     // Replace with your Redis connection details
//     host: 'localhost',
//     port: 6379,
//     password: 'your-password'
//   })

const pub = new Redis({
    host: "nextchat-annnmol-nextchat.a.aivencloud.com",
    port: 21555,
    username: "default",
    password: "AVNS_EImMGVwW9Pms2hhgihi",
});

const sub = pub.duplicate();


// Export the client and the adapter
const redis = { redisClient: pub, redisAdapter: sub }

export default redis;