import { useState, useEffect } from "react";
import { FcTodoList } from "react-icons/fc";
import { MdOutlineDeleteForever } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { RiEdit2Line } from "react-icons/ri";

export const TodoApp = () => {
    const [input, setInput] = useState("");
    const [todolist, setTodoList] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });

    const [mode, setMode] = useState("dark");
    const [dob, setDob] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todolist));
    }, [todolist]);

    const handleAddButton = () => {
        if (input.trim() === "") return;

        if (editIndex !== null) {
            const updated = todolist.map((todo, index) =>
                index === editIndex
                    ? { ...todo, text: input, dob: dob }
                    : todo
            );

            setTodoList(updated);
            setEditIndex(null);
        } else {
            setTodoList([
                ...todolist,
                { text: input, dob: dob, complete: false },
            ]);
        }

        setInput("");
        setDob("");
    };

    const handleDeleteIcon = (index) => {
        setTodoList(todolist.filter((_, i) => i !== index));
    };

    const handleEditButton = (index) => {
        setInput(todolist[index].text);
        setDob(todolist[index].dob);
        setEditIndex(index);
    };

    const handleCheckBoxButton = (index) => {
        const updated = todolist.map((todo, i) =>
            i === index
                ? { ...todo, complete: !todo.complete }
                : todo
        );

        setTodoList(updated);
    };

    const handleModeButton = () => {
        setMode(mode === "dark" ? "light" : "dark");
    };

    const filteredTodos = todolist.filter((todo) => {
        if (filter === "Active") return !todo.complete;
        if (filter === "complete") return todo.complete;
        return true;
    });

    return (
        <div className={`app ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
            <div className="header">
                <h1>
                    Todo App <FcTodoList />
                </h1>

                <button onClick={handleModeButton}>
                    {mode === "dark" ? "🌙 Dark" : "☀️ Light"}
                </button>
            </div>

            <div className="content">
                <input
                    type="text"
                    placeholder="Enter task..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />

                <button onClick={handleAddButton}>
                    {editIndex !== null ? "Update" : "Add"}
                </button>
            </div>

            <div className="filter">
                <button onClick={() => setFilter("All")}>All</button>
                <button onClick={() => setFilter("Active")}>Active</button>
                <button onClick={() => setFilter("complete")}>Complete</button>
            </div>

            <div className="output">
                <ul>
                    {filteredTodos.map((todo, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                checked={todo.complete}
                                onChange={() => handleCheckBoxButton(index)}
                            />

                            <span
                                style={{
                                    textDecoration: todo.complete
                                        ? "line-through"
                                        : "none",
                                }}
                            >
                                {todo.text}
                            </span>

                            <span>
                                <CgCalendarDates /> {todo.dob}
                            </span>

                            <RiEdit2Line
                                className="edit-icon"
                                onClick={() => handleEditButton(index)}
                            />

                            <MdOutlineDeleteForever
                                className="delete-icon"
                                onClick={() => handleDeleteIcon(index)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};