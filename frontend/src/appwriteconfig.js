import { Client, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("684d5add003ce6bd9cb0"); // Replace with your project ID

export const storage = new Storage(client);
