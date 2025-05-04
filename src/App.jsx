import { Component } from "react";
// import "./App.css";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <>
        <input
          type="text"
          placeholder="Enter Todo"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button
          onClick={() => {
            if (this.state.value === "") return;
            this.props.onSubmit(this.state.value);
            this.setState({ value: "" });
          }}
        >
          Add
        </button>
      </>
    );
  }
}

class TaskItem extends Component {
  render() {
    return (
      <>
        <div>
          <input
            type="checkbox"
            checked={this.props.done}
            onChange={() => this.props.toggle(this.props.taskId)}
          />
          <span
            style={{
              textDecoration: this.props.done ? "line-through" : "none",
            }}
          >
            {this.props.task}
          </span>
        </div>
      </>
    );
  }
}

class Tasks extends Component {
  render() {
    return (
      <>
        {this.props.tasks.map((item) => (
          <TaskItem {...item} key={item.taskId} toggle={this.props.toggle} />
        ))}
      </>
    );
  }
}

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
    this.add = this.add.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  add(item) {
    const task = { task: item, taskId: Date.now(), done: false };
    this.setState({ tasks: [...this.state.tasks, task] });
  }

  toggle(taskId) {
    const updatedTasks = this.state.tasks.map((task) =>
      task.taskId === taskId ? { ...task, done: !task.done } : task
    );
    this.setState({ tasks: updatedTasks });
  }

  render() {
    return (
      <>
        <Input onSubmit={this.add} />
        <Tasks tasks={this.state.tasks} toggle={this.toggle} />
      </>
    );
  }
}

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.add = this.add.bind(this);
  }

  add(item) {
    const todo = { title: item, todoId: Date.now() };
    this.setState({ todos: [...this.state.todos, todo] });
  }

  render() {
    return (
      <>
        <h1>Todos</h1>
        <Input onSubmit={this.add} />
        {this.state.todos.map((todo) => (
          <div key={todo.todoId}>
            <h2>{todo.title}</h2>
            <Todo />
          </div>
        ))}
      </>
    );
  }
}

export default Todos;
