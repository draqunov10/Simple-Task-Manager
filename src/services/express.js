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

exp.get("/create/:task_desc/:task_status", async function (req, res) {
  const task_desc = decodeURIComponent(req.params.task_desc);
  const task_status = decodeURIComponent(req.params.task_status);
  await createTask(task_desc, task_status);

  const tasks = await getTasks();
  const lastID = Math.max(...tasks.map((task) => task.task_id));
  res.send({lastID});
});

exp.get("/update/status/:task_id/:task_status", async function (req, res) {
  const task_id = req.params.task_id;
  const task_status = decodeURIComponent(req.params.task_status);
  await updateTaskStatus(task_id, task_status);
});

exp.get("/update/desc/:task_id/:task_desc", async function (req, res) {
  const task_id = req.params.task_id;
  const task_desc = decodeURIComponent(req.params.task_desc);
  await updateTaskDesc(task_id, task_desc);
});

exp.get("/delete/:task_id", async function (req, res) {
  const task_id = req.params.task_id;
  await deleteTask(task_id);
});

exp.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

exp.listen(8081, () => console.log("Express Server running on port 8081"));