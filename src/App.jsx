import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";

const Home = lazy(() => import("./components/Home"));
const Counter = lazy(() => import("./components/Counter"));
const TodoList = lazy(() => import("./components/TodoList"));
const UpDown = lazy(() => import("./components/UpDown"));
const NotFound = lazy(() => import("./components/NotFound"));

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Apply theme class to body for global background color control
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Suspense fallback={<div>로딩 중...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/TodoList"
            element={<TodoList isDarkMode={isDarkMode} />}
          />
          <Route path="/Counter" element={<Counter />} />
          <Route path="/UpDown" element={<UpDown />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
