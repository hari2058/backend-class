"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const server = http_1.default.createServer((req, res) => {
    console.log("Request received", req.url);
    if (req.url === "/") {
        console.log("Root Page");
        res.writeHead(200, "Home Page Sent Successfully", {
            "content-Type": "text/html",
        });
        //read the file
        const currentWorkingDirectory = process.cwd();
        console.log("current working directory", currentWorkingDirectory);
        const filePath = path_1.default.join(currentWorkingDirectory, "src/pages/index.html");
        const fileContent = fs_1.default.readFileSync(filePath);
        console.log("file content", fileContent.toString());
        res.write(fileContent.toString());
        res.end();
    }
    else if (req.url === "/contact-us") {
        console.log("Contact us page");
        res.writeHead(200, "contact Page Sent Successfully", {
            "content-Type": "text/html",
        });
        //contact us file
        const currentWorkingDirectory = process.cwd();
        console.log("Current Working directiory", currentWorkingDirectory);
        const filePath = path_1.default.join(currentWorkingDirectory, "src/pages/contact-us.html");
        const contactUsFile = fs_1.default.readFileSync(filePath);
        console.log("file content ", contactUsFile.toString());
        res.write(contactUsFile.toString());
        res.end();
    }
    else if (req.url === "/about-us") {
        console.log("About Us Page");
        res.writeHead(200, "About Page sent successfully.", {
            "content-Type": "text/html",
        });
        const currentWorkingDirectory = process.cwd();
        console.log("Current Working directory", currentWorkingDirectory);
        const filePath = path_1.default.join(currentWorkingDirectory, "src/pages/about-us.html");
        const aboutUsFile = fs_1.default.readFileSync(filePath);
        console.log("file content", aboutUsFile.toString());
        res.write(aboutUsFile.toString());
        res.end();
    }
    else {
        console.log("error  Page");
        res.writeHead(200, "error Page sent successfully.", {
            "content-Type": "text/html",
        });
        const currentWorkingDirectory = process.cwd();
        console.log("Current Working directory", currentWorkingDirectory);
        const filePath = path_1.default.join(currentWorkingDirectory, "src/pages/errorpage.html");
        const errorUsFile = fs_1.default.readFileSync(filePath);
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
//# sourceMappingURL=main.js.map