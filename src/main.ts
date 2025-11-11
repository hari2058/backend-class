import http from "http";
import fs from "fs";
import path from "path";

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
    res.writeHead(200, "contact Page Sent Successfully", {
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
  }
  // else if ( req.url == "/todo-route" && req.method === "POST") {

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

//Homework
//about-us page and 404 page
