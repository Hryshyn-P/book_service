import { connect, set } from "mongoose";

const initDb = () => {
  set("strictQuery", true);
  return new Promise((resolve, reject) => {
    connect(process.env.CONNECTION_STRING, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log("Successfully connected to MongoDB");
        resolve();
      }
    });
  });
};

export default initDb;
