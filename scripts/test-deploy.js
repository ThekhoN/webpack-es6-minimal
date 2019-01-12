const express = require("express");
const path = require("path");
const opn = require("opn");
const app = express();

const PORT = 8999;

app.use(express.static("build"));
app.get("*", function (request, response) {
    response.sendFile(path.resolve("build/index.html"));
});

app.listen(PORT, () => {
    console.log("app is running on http://localhost:", PORT);
    setTimeout(() => {
        opn(`http://127.0.0.1:${PORT}`);
    }, 100);
});
