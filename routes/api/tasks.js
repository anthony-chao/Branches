const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Task = require("../../models/Task");
const validateTaskInput = require("../../validation/task");

router.get("/test", (req, res) => res.json({ msg: "This is the tasks route" }));

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateTaskInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        projectId: req.body.projectId,
        status: req.body.status
      });
  
      newTask.save().then(task => res.json(task));
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateTaskInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const deletedMemberProject = Task.findById(req.params.id)
        .then(project => project.members.pull(req.body.id))
    }

)



module.exports = router;