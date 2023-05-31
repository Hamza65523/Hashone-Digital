const Tasks  = require("../models/Task");

const router = require("express").Router();

//CREATE

// createOrder is fired by stripe webhook
// example endpoint

router.post("/",  async (req, res) => {
  const taskData =req.body 
  const createdTasks = [];

// Loop through each object in taskData and create/save Task documents
taskData.forEach(taskObj => {
  const newTask = new Tasks(taskObj);
  createdTasks.push(newTask.save());
});

// Wait for all the save operations to complete
Promise.all(createdTasks)
  .then(savedTasks => {
    console.log('Tasks saved successfully:', savedTasks);
  })
  .catch(error => {
    console.error('Error saving tasks:', error);
  });
});

//UPDATE
router.put("/:taskid",  async (req, res) => {
  try {
    const updateTask = await Tasks.findByIdAndUpdate(
      req.params.taskid,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updateTask);
  } catch (err) {
    res.status(500).send(err);
  }
});

//UPDATE
router.put("/:taskid/:subtaskid",  async (req, res) => {
    const taskId = req.params.taskid;
    const subtaskId = req.params.subtaskid;
    // const updatedSubtaskData = {
    //   title: 'New Subtask Title',
    //   status: true
    // };
    const updatedSubtaskData =req.body
    
    // Find the main task document
    Tasks.findById(taskId)
      .then(task => {
        if (!task) {
          throw new Error('Task not found');
        }
    
        // Find the specific subtask within the subTasks array
        const subtaskToUpdate = task.subTasks.find(subtask => subtask._id.toString() === subtaskId);
    
        if (!subtaskToUpdate) {
          throw new Error('Subtask not found');
        }
    
        // Update the properties of the subtask
        // subtaskToUpdate.title = updatedSubtaskData.title;
        subtaskToUpdate.status = updatedSubtaskData.status;
    
        // Save the updated main task document
        return task.save();
      })
      .then(updatedTask => {
        console.log('Subtask updated successfully');
        console.log('Updated task:', updatedTask);
        res.status(200).send(updatedTask);
      })
      .catch(error => {
        console.error('Error updating subtask:', error);
        res.status(500).send(err);
      });
    
  
});

//DELETE task
router.delete("/:taskid",  async (req, res) => {
  try {
    await Tasks.findByIdAndDelete(req.params.taskid);
    res.status(200).send("Task has been deleted...");
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE subtask 
router.delete("/:taskid/:subtaskid",  async (req, res) => {
  try {
    // Assuming you have the ID of the main task document and the ID of the subtask you want to delete
const taskId = req.params.taskid;
const subtaskId = req.params.subtaskid;

// Find the main task document
Tasks.findById(taskId)
  .then(task => {
    if (!task) {
      throw new Error('Task not found');
    }
    // Filter out the subtask to be deleted from the subTasks array
    task.subTasks = task.subTasks.filter(subtask => subtask._id.toString() !== subtaskId);

    // Save the updated main task document
    return task.save();
  })
  .then(updatedTask => {
    console.log('Subtask deleted successfully');
    console.log('Updated task:', updatedTask);
  })
  .catch(error => {
    console.error('Error deleting subtask:', error);
  });
  } catch (err) {
    res.status(500).send(err);
  }
});



//GET ALL Tasks

router.get("/",  async (req, res) => {
  const Taskss = await Tasks.find();
  res.status(200).send(Taskss);
  try {
  } catch (err) {
    res.status(500).send(err);
  }
});



module.exports = router;
