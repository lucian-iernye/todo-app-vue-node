const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});

mongoose.connect(
  "mongodb+srv://test:Z9RKCSWu0CTkrQmo@cluster0.0b36m.mongodb.net/todo-vue-node?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

let db = mongoose.connection;
db.on("open", () => {
  console.log("Connected to database");
});
db.on("error", (err) => {
  console.log("Error connecting to database");
});

let todoModel = require("./todoSchema");

//routes
app.get("/todos", (req, res) => {
  todoModel.find({ completed: false }, (err, todos) => {
    if (err) {
      res.send(err);
    }
    res.json(todos);
  });
});

app.post("/add-todo", (req, res) => {
  let newTodo = new todoModel();
  newTodo.title = req.body.title;
  newTodo.description = req.body.description;
  newTodo.completed = false;
  newTodo.save((err, todo) => {
    if (err) {
      res.send(err);
    }
    res.json(todo);
  });
});

app.post("/toggle-completed/:id", (req, res) => {
  todoModel.findByIdAndUpdate(
    req.params.id,
    { completed: !req.body.completed },
    (err, todo) => {
      if (err) {
        res.send(err);
      }
      res.json(todo);
    }
  );
});

// app.post("/uncomplete-todo/:id", (req, res) => {
//   todoModel.findByIdAndUpdate(
//     req.params.id,
//     { completed: false },
//     (err, todo) => {
//       if (err) {
//         res.send(err);
//       }
//       res.json(todo);
//     }
//   );
// });

app.post("update-todo/:id", (req, res) => {
  todoModel.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    },
    (err, todo) => {
      if (err) {
        res.send(err);
      }
      res.json(todo);
    }
  );
});

app.delete("/delete-todo/:id", (req, res) => {
  let deleteQuery = { _id: req.params.id };
  todoModel.findOneAndRemove(deleteQuery, (err, todo) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Todo deleted" });
  });
});
