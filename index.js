const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3xqxv.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
  try {
    await client.connect();
    const projectCollection = client.db("portfolio").collection("projects");

    app.get("/projects", async (req, res) => {
      const projects = await projectCollection.find({}).toArray();
      res.send(projects);
    });

    app.get("/projects/:id", async (req, res) => {
      const query = { _id: ObjectId(req.params.id) };
      console.log(query, "hi project");
      const projects = await projectCollection.findOne(query);
      res.send(projects);
    });

    app.get("/h", (req, res) => {
      const hi = "hello arick p , What's up? arick";
      res.send(hi);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  const hi = "hello arick , What's up? arick";
  res.send(hi);
});
app.listen(port, () => {
  console.log("port is running portfolio", port);
});
