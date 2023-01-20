const express = require("express");
const body_parser = require("body-parser");


const app = express();
app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));

var items = [];
let worksItems = [];

app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"

    };
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        worksItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }

})

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: items });
});

app.listen(3000, function () {
    console.log("server started on 3000");
});