import React from 'react';
import Tasks from './Tasks';
import { Paper, TextField } from '@material-ui/core';
import { Checkbox, Button } from '@material-ui/core';
import './App.css';

class App extends Tasks {
  state = { tasks: [], currentTask: "" };

  handleSubmit = (event) => {
    event.preventDefault();
    const { currentTask } = this.state;
    if (currentTask.trim() !== "") {
      this.setState((prevState) => ({
        tasks: [
          ...prevState.tasks,
          { _id: Date.now(), task: currentTask, completed: false },
        ],
        currentTask: "",
      }));
    }
  };

  handleChange = (event) => {
    this.setState({ currentTask: event.target.value });
  };

  handleUpdate = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task._id !== id),
    }));
  };

  render() {
    const { tasks } = this.state;
    return (
      <div className="App flex">
        <Paper elevation={3} className="container">
          <div className="heading">TO-DO-LIST APP</div>
          <form
            onSubmit={this.handleSubmit}
            className="flex"
            style={{ margin: "18px" }}
          >
            <TextField
              variant="outlined"
              size="small"
              style={{ width: "150px" }}
              value={this.state.currentTask}
              required={true}
              onChange={this.handleChange}
              placeholder="Add New To-Do"
            />
            <Button
              style={{ height: "40px" }}
              color="primary"
              variant="outlined"
              type="submit"
            >
              Add task
            </Button>
          </form>
          <div>
            {tasks.map((task) => (
              <Paper key={task._id} className="flex task_container">
                <Checkbox
                  checked={task.completed}
                  onClick={() => this.handleUpdate(task._id)}
                  color="primary"
                />
                <div
                  className={task.completed ? "task line_through" : "task"}
                >
                  {task.task}
                </div>
                <Button
                  onClick={() => this.handleDelete(task._id)}
                  color="secondary"
                >
                  delete
                </Button>
              </Paper>
            ))}
          </div>
        </Paper>
      </div>
    );
  }
}

export default App;
