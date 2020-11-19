import { Autohook } from "twitter-autohook";
import { config } from "dotenv";

const env = process.env.NODE_ENV || "development";

if (env === "dev" || env === "development") {
  config();
}

const webhook = new Autohook();

export const start = async () => {
  try {
    // Removes existing webhooks
    await webhook.removeWebhooks();
    // Starts a server and adds a new webhook
    await webhook.start();

    // Subscribes to your own user's activity
    await webhook.subscribe({
      oauth_token: process.env.TWITTER_ACCESS_TOKEN,
      oauth_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
  } catch (e) {
    // Display the error and quit
    console.error(e);
    process.exit(1);
  }
};
