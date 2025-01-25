import express from "express";
import productRouter from "./routes/products";

const port = 3030;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Samuel!");
});

app.use("/products", productRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
