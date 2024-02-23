"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var port = 4000;
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.json("OOOOOOK");
});
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
