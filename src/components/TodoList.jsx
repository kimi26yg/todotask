import "./TodoList.css";
import { useEffect, useState } from "react";

const todoList = [
  { id: 1, task: "첫번째할일", isDone: false },
  { id: 2, task: "두번째할일", isDone: true },
  { id: 3, task: "세번째할일", isDone: false },
  { id: 4, task: "네번째할일", isDone: false },
  { id: 5, task: "다섯번째할일", isDone: false },
];

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.isDone ? "completed" : ""}>
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.task}</span>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        ✖
      </button>
    </li>
  );
}

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [todoValue, setTodoValue] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [isDarkMode, setIsDarkMode] = useState(true); // 다크모드 기본값

  // 남은 할 일 개수 계산
  const remainingCount = todos.filter((todo) => !todo.isDone).length;
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  // 필터링된 할 일 목록
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.isDone;
    if (filter === "completed") return todo.isDone;
    return true; // all
  });

  function isDoneToggle(id) {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
    );
    setTodos(newTodos);
  }

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function addTodo() {
    if (!todoValue.trim()) return;
    const newTodo = {
      id: Date.now(),
      task: todoValue,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setTodoValue("");
  }

  // 전체 삭제
  function deleteAllTodos() {
    setTodos([]);
  }

  // 완료된 항목 일괄 삭제
  function deleteCompletedTodos() {
    const newTodos = todos.filter((todo) => !todo.isDone);
    setTodos(newTodos);
  }

  // 현재 날짜 포맷
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 테마 토글 함수
  function toggleTheme() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <div className={`container ${isDarkMode ? "dark" : "light"}`}>
      <header className="header">
        <div className="header-top">
          <h1>{today}</h1>
          <div className="header-right">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              <span className="theme-label">
                {isDarkMode ? "DARK" : "LIGHT"}
              </span>
            </button>
            <div className="remaining-count">
              <span className="count">{remainingCount}</span>
              <span className="label">tasks left</span>
            </div>
          </div>
        </div>
      </header>

      <div className="input-box">
        <input
          type="text"
          placeholder="Add a new task..."
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />
        <button className="add-btn" onClick={addTodo}>
          +
        </button>
      </div>

      <div className="controls">
        <div className="filter-controls">
          <button
            className={`filter-dot ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
            title="All"
          >
            <span className="dot"></span>
          </button>
          <button
            className={`filter-dot ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
            title="Active"
          >
            <span className="dot"></span>
          </button>
          <button
            className={`filter-dot ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
            title="Completed"
          >
            <span className="dot"></span>
          </button>
        </div>

        <div className="action-buttons">
          <button className="action-btn" onClick={deleteCompletedTodos}>
            Clear Completed
          </button>
          <button className="action-btn danger" onClick={deleteAllTodos}>
            Clear All
          </button>
        </div>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="empty-state">
          <p>No tasks. Enjoy your coffee.</p>
        </div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={isDoneToggle}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
