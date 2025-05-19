
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

export default function AddForm() {
  const [task, setTask] = useState("");
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 1800);
      return;
    }
    dispatch(addTodo(task));
    setTask("");
  };

  return (
    <>
      {showError && (
        <div style={{
          position: 'fixed',
          top: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#ff4d4f',
          color: '#fff',
          padding: '12px 28px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          zIndex: 1000,
          fontWeight: 500,
          fontSize: '1rem',
          letterSpacing: '0.5px',
          animation: 'fadeInDown 0.3s',
        }}>
          Task cannot be empty!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add Task</button>
      </form>
    </>
  );
}