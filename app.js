import express from "express";
import connect from "./schemas/index.js";
import CharactersRouter from "./routes/characters.router.js";
import ItemsRouter from "./routes/items.router.js";

import dotenv from 'dotenv';
dotenv.config(); 

const { PORT } = process.env;

const app = express();
const port = PORT || 3001;

connect();

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

app.get("/", (req, res) => {
  return res.json({ message: "Hi!" });
});

app.use("/api", [router, CharactersRouter]);
app.use("/api", [router, ItemsRouter]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
