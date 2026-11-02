import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis;
const client = globalForMongo._mongoClient || new MongoClient(process.env.MONGODB_URI);
if (process.env.NODE_ENV !== "production") globalForMongo._mongoClient = client;
const db = client.db("studiospace");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.BETTER_AUTH_URL],
  emailAndPassword: { enabled: true, minPasswordLength: 6, autoSignIn: false },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});