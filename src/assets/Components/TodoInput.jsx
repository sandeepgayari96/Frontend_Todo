import { useState } from "react";
import { FcTodoList } from "react-icons/fc";
import { MdOutlineDeleteForever } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { RiEdit2Line } from "react-icons/ri";

export const TodoApp = () => {
    const [input, setInput] = useState("");
    const [todolist, setTodoList] = useState([]);
    const [mode, setMode] = useState("dark");
    const [dob, setDob] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [filter, setFilter] = useState("All");
    const handleAddButton = () => {
        if (input.trim() === "") return;

        if (editIndex !== null) {
            const updatedList = todolist.map((todo, idx) =>
                idx === editIndex
                    ? {
                        ...todo,
                        text: input,
                        dob: dob,
                    }
                    : todo
            );

            setTodoList(updatedList);
            setEditIndex(null);
        } else {
            setTodoList([
                ...todolist,
                {
                    text: input,
                    dob: dob,
                    completed: false,
                },
            ]);
        }

        setInput("");
        setDob("");
    };

    
    const handleDeleteIcon = (index) => {
        setTodoList(todolist.filter((_, i) => i !== index));
    };

  
    const handleModeButton = () => {
        setMode(mode === "dark" ? "light" : "dark");
    };

    
    const handleEditButton = (index) => {
        setInput(todolist[index].text);
        setDob(todolist[index].dob);
        setEditIndex(index);
    };

    
    const handleComplete = (index) => {
        const updatedList = todolist.map((todo, idx) =>
            idx === index
                ? { ...todo, completed: !todo.completed }
                : todo
        );

        setTodoList(updatedList);
    };

    const filteredList = todolist.filter((todo) => {
        if (filter === "All") return true;
        if (filter === "Active") return !todo.completed;
        if (filter === "Complete") return todo.completed;
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
                    placeholder="Enter Task..."
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
                <button onClick={() => setFilter("Complete")}>Complete</button>
            </div>

            <div className="output">
                <ul>
                    {filteredList.map((todo, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleComplete(index)}
                            />

                            <span
                                style={{
                                    textDecoration: todo.completed
                                        ? "line-through"
                                        : "none",
                                    marginRight: "10px",
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
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                }}
                            />

                            <MdOutlineDeleteForever
                                className="delete-icon"
                                onClick={() => handleDeleteIcon(index)}
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};