var static_data = require("./data/sessions.json");

var fs = require("fs"),
  ejs = require("ejs");

function ejs2html(path, information) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return false;
    }
    var ejs_string = data,
      template = ejs.compile(ejs_string),
      html = template({ sessions: information });
    console.log(path.split(".")[0]);
    fs.writeFile("index.html", html, function (err) {
      if (err) {
        console.log(err);
        return false;
      }
      return true;
    });
  });
}

ejs2html(__dirname + "/index.ejs", static_data);
