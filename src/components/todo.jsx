
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import AddForm from "./AddForm";
import { deleteTodo, markAsDone, editTodo } from "../features/todo/todoSlice";
import styles from "./todo.module.css";

export default function Todo() {
    const todos = useSelector((state) => state.todos?.todos || []);
    const dispatch = useDispatch();

    // State for editing
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleMarkAsDone = (id) => {
        dispatch(markAsDone(id));
    };

    const handleEditClick = (todo) => {
        setEditingId(todo.id);
        setEditValue(todo.task);
    };

    const handleEditChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleEditSave = (id) => {
        if (editValue.trim()) {
            dispatch(editTodo({ id, newTask: editValue }));
            setEditingId(null);
            setEditValue("");
        }
    };

    const handleEditCancel = () => {
        setEditingId(null);
        setEditValue("");
    };

    return (
        <>
            <AddForm />
            <h2>Todo List App</h2>
            <div className={styles["todo-card-list"]}>
                {todos.map((todo, idx) => (
                    <div
                        key={todo.id}
                        className={
                          todo.isdone
                            ? `${styles["todo-card"]} ${styles["done"]}`
                            : styles["todo-card"]
                        }
                        style={{ animation: `fadeInUp 0.4s ${idx * 0.08}s both` }}
                    >
                        {editingId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={handleEditChange}
                                    style={{ marginRight: "8px", flex: 1, fontSize: '1rem', padding: '6px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    autoFocus
                                />
                                <button onClick={() => handleEditSave(todo.id)} style={{ marginRight: "4px" }}>Save</button>
                                <button onClick={handleEditCancel}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <div className={styles["todo-task"]}>{todo.task}</div>
                                <button onClick={() => handleMarkAsDone(todo.id)} style={{ marginRight: "4px" }}>
                                    {todo.isdone ? "Done" : "Mark as Done"}
                                </button>
                                <button onClick={() => handleEditClick(todo)} style={{ marginRight: "4px" }}>Edit</button>
                                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
