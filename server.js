const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  fs.writeFileSync(title, content);
  res.end("ok");
});

app.put("/blogs/:title", (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end("ok");
  } else {
    res.status(404).send("This post does not exist!");
  }
});

app.delete("/blogs/:title", (req, res) => {
  const { title } = req.params;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.end("ok");
  } else {
    res.status(404).send("This post does not exist!");
  }
});

app.get('/blogs/:title', (req, res) => {
  const { title } = req.params;
  if (fs.existsSync(title)) {
      const post = fs.readFileSync(title, 'utf8');
      res.send(post);
  } else {
      res.status(404).send('This post does not exist!');
  }
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
