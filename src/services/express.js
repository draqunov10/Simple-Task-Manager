import express from "express";
import cors from "cors";
import {getTasks, createTask, updateTaskStatus, updateTaskDesc, deleteTask} from "./database.js";


const exp = express();
exp.use(cors());

exp.get("/", async function (req, res) {
  res.send("Hello Worlddddddd");
});

exp.get("/tasks", async function (req, res) {
  const allTasks = await getTasks();
  res.send(allTasks);
});

exp.get("/tasks/:status", async function (req, res) {
  const taskStatus = req.params.status;
  const tasks = await getTasks(taskStatus);
  res.send(tasks);
});

exp.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

exp.listen(8081, () => console.log("Express Server running on port 8081"));