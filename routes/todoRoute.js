const express = require("express");
const todoController = require("../controller/todoController");

const router = express.Router();

//GET all Todos : GET /todos
router.get("/", todoController.getAllTodos);

//GET Todo by id: GET/todos/:id
router.get("/:id", todoController.getTodoById);

//Create Todo: POST /todos
//BODY : title(required) , completed(default:false), dueDate()//ให้เป็นnull เพราะไม่ต้องมีวันกำหนดก็ได้ เวลาไม่กรอกมาจะได้ไม่error
router.post("/", todoController.createTodo);

//Update Todo: PUT/todos/:id
//BODY: title(required), completed(default:false), dueDate
router.put("/:id", todoController.updateTodo);

//DELETE tdo:DELETE/todos/:id
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
