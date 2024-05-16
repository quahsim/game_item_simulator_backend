import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config(); 

const { MONGODB_URL} = process.env;

const connect = () => {
  mongoose
    .connect(
      MONGODB_URL,
      {
        dbName: "game_item_simulator", // Use the database name from the environment variable
      },
    )
    .then(() => console.log("MongoDB 연결에 성공하였습니다."))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB 연결 에러", err);
});

export default connect;
