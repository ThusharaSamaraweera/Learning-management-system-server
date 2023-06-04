import { MongoClient, ServerApiVersion } from "mongodb";
import { Logger } from "../../../utils/logger/logger";
import { MONG0DB_SERVICE } from "../../../constants/logConstants";
const uri =
  `mongodb+srv://${process.env.MONGODB_DB_USERNAME}:${process.env.MONGODB_DB_PASSWORD}@${process.env.MONGODB_DB_HOST_NAME}` +
  `/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function mongoDBconnect() {
  const logger = new Logger(MONG0DB_SERVICE);

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    logger.info({ message: "Pinged your deployment. You successfully connected to MongoDB!" });
  } catch (e) {
    logger.error({ message: `MongoDB connection ${e}` });
  }
  //   finally {
  //     // Ensures that the client will close when you finish/error
  //     console.log('Closing mongodb connection')
  //     await client.close();
  //   }
}
