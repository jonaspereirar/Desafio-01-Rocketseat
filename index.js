const express = require("express");
const server = express();

server.use(express.json()); //work with json on insomnia

//variables
const projects = [];
let numberOfRequests = 0;

function checkProjectExists(req, res, next) {
  //returns an error if id does not exist
  const { id } = req.params;
  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

server.get("/projects", (req, res) => {
  //retur projects all
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  //Return project included in list
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  //update in projects
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  //Delete projects
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id === id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  //increments the task if the id is existing
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.json(project);
});
server.listen(3000);
