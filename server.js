import express, { request } from "express";

const app = express();

app.get("/users", (req, res) => {
  res.send("Ok, deu bom");
});

app.listen(3000);
