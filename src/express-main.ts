import express from "express";

const app = express();

interface Todo {
  id: number;
  name: string;
  email: string;
}
let todos: Todo[] = [];

app.use(express.json());

//routes

// app.get("/", (req, res) => {
//   res.send("Hello express updated");
// });

// app.get("/contact-us", (req, res) => {
//   res.send(`<h1>contact Us</h1>`);
// });


//create todo route 

app.post("/todo-route", (req, res) => {
  console.log("body", req.body);
  const newTodo = req.body as Todo;
  todos.push(newTodo);

  res.json({
    message: "Created todo",
     newTodo,
  });
});

app.get("/todo-route", (req, res) => {
  res.json({
    message: "Received Todo.",
   todos,
  });
});

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
