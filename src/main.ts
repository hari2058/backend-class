import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer((req, res) => {
  console.log("Request received", req.url);

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
    console.log("Current Working drrectiory", currentWorkingDirectory);

    const filePath = path.join(
      currentWorkingDirectory,
      "src/pages/contact-us.html"
    );

    const contactUsFile = fs.readFileSync(filePath);
    console.log("file content ", contactUsFile.toString());

    res.write(contactUsFile.toString());
    res.end();
  } 
});

const errorPage = 

server.listen(3000, () => {
  console.log("started server @ http://localhost:3000");
});

//Homework
//about-us page and 404 page
