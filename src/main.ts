import http from "http";
import fs from "fs";
import path from "path";

interface Todo {
  id: number;
  name: string;
  email: string;
}
let todos: Todo[] = [];
const server = http.createServer(async (req, res) => {
  console.log("Request received", req.url);

  let body = "";

  if (req.url === "/") {
    console.log("Root Page");

    res.writeHead(200, "Home Page Sent Successfully", {
      "content-Type": "text/html",
    });
    //read the file
    const currentWorkingDirectory = process.cwd();
    console.log("current working directory", currentWorkingDirectory);

    const filePath = path.join(currentWorkingDirectory, "src/pages/index.html");

    const fileContent = fs.readFileSync(filePath);
    console.log("file content", fileContent.toString());

    res.write(fileContent.toString());
    res.end();
  } else if (req.url === "/contact-us") {
    console.log("Contact us page");
    res.writeHead(200, "contact Page Sent successfully.", {
      "content-Type": "text/html",
    });

    //contact us file
    const currentWorkingDirectory = process.cwd();
    console.log("Current Working directiory", currentWorkingDirectory);

    const filePath = path.join(
      currentWorkingDirectory,
      "src/pages/contact-us.html"
    );

    const contactUsFile = fs.readFileSync(filePath);
    console.log("file content ", contactUsFile.toString());

    res.write(contactUsFile.toString());
    res.end();
  } else if (req.url === "/about-us") {
    console.log("About Us Page");
    res.writeHead(200, "About Page sent successfully.", {
      "content-Type": "text/html",
    });

    const currentWorkingDirectory = process.cwd();
    console.log("Current Working directory", currentWorkingDirectory);

    const filePath = path.join(
      currentWorkingDirectory,
      "src/pages/about-us.html"
    );

    const aboutUsFile = fs.readFileSync(filePath);
    console.log("file content", aboutUsFile.toString());

    res.write(aboutUsFile.toString());
    res.end();
  } else if (req.url === "/submit-form" && req.method === "POST") {
    console.log("SUbmitting form");

    async function processData() {
      return new Promise((resolve, reject) => {
        req.on("data", (data) => {
          console.log("data received", data.toString());
          body += data;
          resolve(data);
        });
      });
    }

    await processData();

    async function processError() {
      return new Promise((resolve, reject) => {
        req.on("end", () => {
          console.log("All data received");
          resolve("All data received");
        });
      });
    }
    await processError();

    res.writeHead(201, "Form is submitted.", {
      "Content-Type": "application/json",
    });

    res.write(
      JSON.stringify({
        message: "Form Submitted successfully!",
        data: JSON.parse(body),
      })
    );

    console.log("response sent");
    res.end();
  } else if (req.url == "/todo-route" && req.method === "POST") {
    async function receivedData() {
      return new Promise((resolve, reject) => {
        req.on("data", (data) => {
          console.log("Todos Received", data.toString());
          body += data.toString();
          resolve(data);
        });
      });
    }
    await receivedData();
    const bodyJSON: Todo = JSON.parse(body);

    //Save the data

    todos.push(bodyJSON);

    res.writeHead(201, "created todos.", {
      "Content-Type": "application/json",
    });

    res.write(
      JSON.stringify({
        message: "Todos created.",
        data: bodyJSON,
      })
    );
    console.log("todos created");
    res.end();
  } else if (req.url === "/todo-route" && req.method === "GET") {
    //get the data from the array

    //send response

    res.writeHead(200, "Todos Fetched", {
      "content-type": "applicatiom/json",
    });

    res.write(
      JSON.stringify({
        message: "todos fetched!",
        data: todos,
      })
    );
    res.end();
  } else if (req.url?.includes("/todo-route?id=") && req.method === "DELETE") {
    // "/todos?id=1"
    // params = http://localhost:3000/todos/:id
    //query http://localhost:3000/todos?id=1

    const url = req.url;
    console.log("delete a todo", url);

    const idNullable = url.split("=")[1]; //['/todod?id', '1']

    console.log("id nullable", idNullable);

    if (!idNullable) {
      res.writeHead(400, " Id not valid", {
        "content-type": "application/json",
      });

      res.write(
        JSON.stringify({
          message: "send the correct id!",
        })
      );
      res.end();
      return;
    }

    const idNum = parseInt(idNullable);

    //chech if todo exists in the array by the same id

    const todoFound = todos.find((todo) => {
      if (todo.id === idNum) {
        return true;
      } else {
        return false;
      }
    });

    if (!todoFound) {
      res.writeHead(404, "Todo not found", {
        "content-type": "application/json",
      });

      res.write(
        JSON.stringify({
          message: "Todo not found!",
        })
      );
      res.end();
    }

    const updatedTodos = todos.filter((todo) => {
      if (todo.id === idNum) {
        return false;
      } else {
        return true;
      }
    });

    todos = updatedTodos;
    res.writeHead(200, "Todo deleted", {
      "content-type": "application/json",
    });
    res.write(
      JSON.stringify({
        message: "Todo deleted successfully!",
      })
    );
    res.end();
  } else if (req.url?.includes("/todo-route?id=") && req.method === "GET") {
    //get elelemts by id
    const url = req.url;
    //if url ma id null pathaye chai error display garna ko lagi
    const idNullable = url.split("=")[1];

    if (!idNullable) {
      res.writeHead(400, "id not valid", {
        "content-type": "application/json",
      });

      res.write(
        JSON.stringify({
          message: "Send the valid id!",
        })
      );
      res.end();
      return;
    }

    const idNum = parseInt(idNullable);

    //check if todo exists in the array by the same id

    const todoFound = todos.find((todo) => {
      if (todo.id === idNum) {
        return false;
      } else {
        return true;
      }
    });

    if (!todoFound) {
      res.writeHead(404, "Todo  found", {
        "content-type": "application/json",
      });
      res.write(
        JSON.stringify({
          message: "Todo  found!",
        })
      );
      res.end();
    }

    const updatedTodos = todos.filter((todo) => {
      if (todo.id === idNum) {
        return true;
      } else {
        return false;
      }
    });

    todos = updatedTodos;
    res.writeHead(200, "Todo Updated using id.", {
      "content-type": "application/json",
    });
    res.write(
      JSON.stringify({
        message: "Todo updated by id.",
        todos: updatedTodos,
      })
    );
    res.end();
  }
  // else if (req.url == "/todo-route" && req.method === "PUT") {

  // }
  else {
    console.log("error  Page");
    res.writeHead(200, "error Page sent successfully.", {
      "content-Type": "text/html",
    });

    const currentWorkingDirectory = process.cwd();
    console.log("Current Working directory", currentWorkingDirectory);

    const filePath = path.join(
      currentWorkingDirectory,
      "src/pages/errorpage.html"
    );

    const errorUsFile = fs.readFileSync(filePath);
    console.log("file content", errorUsFile.toString());

    res.write(errorUsFile.toString());
    res.end();
  }
});

server.listen(3000, () => {
  console.log("started server @ http://localhost:3000");
});

//  {
//   "id": 1,
//   "name": "ram",
//   "email": "ram@gmail.com",
//  }

//  {
//   "id": 2,
//   "name": "shyam",
//   "email": "shyam@gmail.com",
//  }
