const express = require("express");

const todoRoute = require("./routes/todoRoute");

const app = express(); //สร้างserver

app.use(express.json());

app.use("/todos", todoRoute); //ถ้ามีpath /todos คือให้มาทำงานที่File todoRoute
//app.use('/users/,userRoute)


app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

app.listen(8002, () => console.log("server running on port 8002"));
