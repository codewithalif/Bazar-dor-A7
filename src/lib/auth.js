// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db("BAZAR-DOR");

// export const auth = betterAuth({
//   emailAndPassword: {
//     enabled : true
//   },
//   socialProviders: {
//         google: { 
//             clientId: process.env.GOOGLE_URI, 
//             clientSecret: process.env.GOOGLE_SECRET, 
//         }, 
//          github: { 
//             clientId: process.env.GITHUB_URI, 
//             clientSecret: process.env.GITHUB_SECRET, 
//         }, 
//     },
//   database: mongodbAdapter(db, {
//     client,
//   }),
// });