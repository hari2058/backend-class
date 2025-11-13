import express from "express";

const app = express();

//routes

app.get("/", (req, res) => {
  res.send("Hello express updated");
});

app.get("/contact-us", (req, res) => {
  res.send(`<h1>contact Us</h1>`);
});

app.post("/todo-route", (req, res) => {



});

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
