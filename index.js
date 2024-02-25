// import requirements
const express = require("express");
const cors = require("cors");

// swapping
const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extendorigin: 'http://localhost:8080', 
methods: ['GET', 'POST'], 
allowedHeaders: ['Content-Type', 'Authorization'],ed: true }));
app.use(cors({}));

// routes
app.use(require("./routes/route"));

// listen
app.listen(port, () => {
  console.log(`server start from localhost:${port}`);
});
