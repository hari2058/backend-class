"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//routes
app.get("/", (req, res) => {
    res.send("Hello express");
});
app.get("/contact-us", (req, res) => {
    res.send(`<h1>contact Us</h1>`);
});
app.listen(4000, () => {
    console.log("Listening on http://localhost:4000");
});
//# sourceMappingURL=express-main.js.map