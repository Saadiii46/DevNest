import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";
import dotenv from "dotenv";
dotenv.config();

admin.initializeApp();

// const db = admin.firestore();

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;

// 🔥 Initialize Algolia with your Firebase environment variables
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);

const index = client.initIndex("users"); // <-- your Algolia index name

// 🧩 Firestore → Algolia Sync Function
export const onUserCreatedOrUpdated = functions.firestore
    .document("users/{userId}")
    .onWrite(async (change, context) => {
      const userId = context.params.userId;

      if (!change.after.exists) {
      // User deleted → remove from Algolia
        await index.deleteObject(userId);
        functions.logger.info(`🗑️ Deleted user ${userId} from Algolia`);
        return;
      }

      const user = change.after.data();

      // Add or update user in Algolia
      await index.saveObject({
        objectID: userId,
        ...user,
      });

      functions.logger.info(`✅ Synced user ${userId} to Algolia`);
    });
