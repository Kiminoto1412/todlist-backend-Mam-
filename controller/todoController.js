const validator = require("validator"); //ใช้ได้กับ str เท่านั้นดูจากdoc
const { readTodos, writeTodos } = require("../service/todoService");
const { v4: uuidv4 } = require("uuid");
const createError = require("../utils/createErr");

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await readTodos();
    res.json({ todos });
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const params = req.params;
    const todos = await readTodos();
    const todo = todos.find((el) => el.id === params.id);
    res.json({ todo: todo ?? null });
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed = false, dueDate = null } = req.body;
    if (typeof title !== "string") {
      //เขียนreturn แทน else เพื่อบังคับจบการทำงาน โค้ดด้านล่างได้เลย
      //การส่งresponeออกไปไม่ได้เเปลว่ามันจะหยุดการทำงาน
      createError("title must be a string", 400);
    }

    if (validator.isEmpty(title)) {
      createError("Title is require.", 400);
    }

    if (typeof completed !== "boolean") {
      createError("Completed must be a boolean.", 400);
    }
    if (dueDate !== null && !validator.isDate(dueDate + "")) {
      //และ ไม่ใช่รูปแบบวันที่
      createError("dueDate must be a date string.", 400);
    }
    const todos = await readTodos();
    const todo =
      //push addของเข้าarray
      {
        id: uuidv4(),
        title,
        completed,
        dueDate: dueDate === null ? dueDate : new Date(dueDate),
      };
    todos.push(todo);
    await writeTodos(todos);
    res.json({ todo }); //ใส่ obj ครอบ todoถึงแม้ todoจะเป็นobjอยู่แล้วเพราะ เราจะได้ส่งหลายตัวได้
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const params = req.params;
    const { title, completed = false, dueDate = null } = req.body;
    // console.log(req.body.title)
    // console.log(typeof(req.body.title))
    if (typeof title !== "string") {
      console.log(title);
      //เขียนreturn แทน else เพื่อบังคับจบการทำงาน โค้ดด้านล่างได้เลย
      //การส่งresponeออกไปไม่ได้เเปลว่ามันจะหยุดการทำงาน
      createError("title must be a string", 400);
    }

    if (validator.isEmpty(title)) {
      createError("Title is require.", 400);
    }

    if (typeof completed !== "boolean") {
      createError("Completed must be a boolean.", 400);
    }
    if (dueDate !== null && !validator.isDate(dueDate + "")) {
      //และ ไม่ใช่รูปแบบวันที่
      createError("dueDate must be a date string.", 400);
    }
    const todos = await readTodos();
    const idx = todos.findIndex((el) => el.id === params.id);
    if (idx === -1) {
      createError("todo is not found", 400);
    }

    console.log(req.body);

    todos[idx] = {
      id: params.id,
      title,
      completed,
      dueDate: dueDate === null ? dueDate : new Date(dueDate),
    };

    await writeTodos(todos);
    res.json({ todo: todos[idx] });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const params = req.params;
    const todos = await readTodos();
    const idx = todos.findIndex((el) => el.id === params.id);
    if (idx === -1) {
      createError("todo is not found", 400);
    }
    todos.splice(idx, 1);
    await writeTodos(todos);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
