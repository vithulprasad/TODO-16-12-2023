const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./model/user");
const jwt = require("jsonwebtoken");
const Todo = require("./model/todo");
const bcrypt = require("bcrypt");
const app = express();
require('dotenv').config();


 app.use(cors({
    origin: 'https://todo-16-12-2023.vercel.app',
    methods: ["GET", "POST"],
  }));
app.use(express.json());

mongoose.connect(
  process.env.MONGODB
);


//-------------------------  Access control ------------------------------
app.get("/access", async (req, res) => {
  const token = req.headers;
  const decode = jwt.verify(token.authorization,process.env.JWT);
  const id = decode.id;

  if (id) {
    const findUser = await user.findById(id);
    if (findUser) {
      res.json({ success: true, user: findUser });
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
});
// ------------------------- Handle Registration -----------------------------
app.post("/register", async (req, res) => {
  const { password, email, phone, name } = req.body.data;
  const passwordHash = password
  const check_user_existing = await user.findOne({ email: email });
  if (check_user_existing) {
    res.json({ message: "user is existing", success: false });
  } else {
    const newUser = new user({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
    });
    await newUser.save();
    res.json({ message: "user added successfully", success: true });
  }
});

// --------------------  Handle Login  --------------------------------------//
app.post("/login", async (req, res) => {
  const { emailOrPass, password } = req.body.data;
 console.log(emailOrPass,'this is details',password)

  const findUser = await user.findOne({
    $or: [{ name: emailOrPass }, { email: emailOrPass }],
  });
 console.log(findUser,'this is the user')
  if (findUser) {
   
    if (password == findUser.password) {
      const token = jwt.sign({ id: findUser._id },process.env.JWT);

      res.json({
        message: "user found",
        success: true,
        user: findUser.name,
        token: token,
      });
    } else {
      res.json({ message: "password is incorrect", success: false });
    }
  } else {
    res.json({
      message: "user not fount please enter correct",
      success: false,
    });
  }
});

//----------------------------------------- Add TODO-----------------------------------

app.post("/addTodoList", async (req, res) => {
  const token = req.body.headers.Authorization;
  const decode = jwt.verify(token,process.env.JWT);
  if (decode.id) {
    const newTodo = new Todo({
      userId: decode.id,
      task: req.body.todoList,
    });
    await newTodo.save();
    res.json({ message: "create todo", success: true });
  } else {
    res.json({ message: "cannot add todo", success: false });
  }
});

//-----------------------------------------List TODO-----------------------------------
app.post("/listTodo", async (req, res) => {
  const token = req.body.headers.Authorization;
  const decode = jwt.verify(token,process.env.JWT);
  
  if (decode.id) {
    const data = req.body.data;
    const skiping = (data - 1) * 3;   
    try {
      let todoList;
        if (data === 1) {
          todoList = await Todo.find({ userId: decode.id }).limit(3);
        } else {
          todoList = await Todo.find({ userId: decode.id }).skip(skiping).limit(3);
        }
     if(todoList.length == 0){
      todoList = await Todo.find({ userId: decode.id }).limit(3);
      res.json({ message: "correct", success: true, values: todoList });
     }else{
      res.json({ message: "correct", success: true, values: todoList });
     }
    } catch (error) {
      console.error("Error fetching todo list:", error);
      res.status(500).json({ message: "Internal server error", success: false });
    }
  } else {
    res.json({ message: "cannot add todo", success: false });
  }
});


//------------------------------------Add Tic------------------------------------

app.post("/complete", async (req, res) => {
  const token = req.body.headers.Authorization;
  const decode = jwt.verify(token, process.env.JWT);
  if (decode.id) {
    const data = req.body.data;
    const findUserTodo = await Todo.find({ userId: decode.id });
    const findcorrect = findUserTodo.filter((value) => {
      return value.task.find((datas) => {
        return datas._id == data;
      });
    });
    const id = findcorrect[0]._id;
    await Todo.findOneAndUpdate(
      {
        _id: id,
        "task._id": data,
      },
      {
        $set: { "task.$.isComplete": true },
      }
    );
    res.json({ message: "correct", success: true });
  } else {
    res.json({ message: "cannot add todo", success: false });
  }
});

//------------------------------------Remove tic---------------------------------
app.post("/notComplete", async (req, res) => {
  const token = req.body.headers.Authorization;
  const decode = jwt.verify(token,process.env.JWT);
  if (decode.id) {
    const data = req.body.data;
    const findUserTodo = await Todo.find({ userId: decode.id });
    const findcorrect = findUserTodo.filter((value) => {
      return value.task.find((datas) => {
        return datas._id == data;
      });
    });
    const id = findcorrect[0]._id;
    await Todo.findOneAndUpdate(
      {
        _id: id,
        "task._id": data,
      },
      {
        $set: { "task.$.isComplete": false },
      }
    );
    res.json({ message: "correct", success: true });
  } else {
    res.json({ message: "cannot add todo", success: false });
  }
});

// ----------------------------------delete One TODO------------------------------------------
app.post("/deleteOneTodo", async (req, res) => {
  const token = req.body.headers.Authorization;
  const decode = jwt.verify(token,process.env.JWT);
  if (decode.id) {
    const data = req.body.data;
    await Todo.findOneAndDelete({ userId: decode.id, _id: data });
    res.json({ message: "correct", success: true });
  } else {
    res.json({ message: "cannot add todo", success: false });
  }
});


app.listen(process.env.PORT, () => {
  console.log("server is on in port", process.env.PORT);
});
