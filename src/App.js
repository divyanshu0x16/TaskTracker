import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    //We can't do useEffect(async() => {})
    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };
        getTasks();
    }, []);
    /*[] is dependency array. If we have a value which we want 
    it to run for when that value changes,
    we will pass it in place of dependency array like [user]*/

    //Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch("https://reactjs-task-tracker-server.herokuapp.com/tasks");
        const data = await res.json();

        return data;
    };

    //FetchTask
    const fetchTask = async (id) => {
        const res = await fetch(`https://reactjs-task-tracker-server.herokuapp.com/tasks/${id}`);
        const data = await res.json();

        return data;
    };

    //Add Task
    const addTask = async (task) => {
        const res = await fetch("https://reactjs-task-tracker-server.herokuapp.com/tasks", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(task),
        });

        const data = await res.json();

        setTasks([...tasks, data]);

        //const newTask = { id, ...task };
        //Because components in react are not mutable. So we must copy
        //setTasks([...tasks, newTask]); //copy the previous task and add new onto it
    };

    //Delete Task
    const deleteTask = async (id) => {
        await fetch(`https://reactjs-task-tracker-server.herokuapp.com/tasks/${id}`, {
            method: "DELETE",
        });

        setTasks(tasks.filter((task) => task.id !== id));
    };

    //Toggle Reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updatedTask = {
            ...taskToToggle,
            reminder: !taskToToggle.reminder,
        };

        const res = await fetch(`https://reactjs-task-tracker-server.herokuapp.com/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        });
        const data = await res.json();

        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: data.reminder } : task
            )
        );
    };

    return (
        <Router>
            <div className="container">
                <Header
                    onAdd={() => setShowAddTask(!showAddTask)}
                    showAdd={showAddTask}
                />

                <Route
                    path="/"
                    exact
                    render={(props) => (
                        <>
                            {/*Short way of doing ternary without an else */}
                            {showAddTask && <AddTask onAdd={addTask} />}
                            {tasks.length > 0 ? (
                                <Tasks
                                    tasks={tasks}
                                    onDelete={deleteTask}
                                    onToggle={toggleReminder}
                                />
                            ) : (
                                "No Task to Show"
                            )}{" "}
                        </>
                    )}
                />
                <Route path="/about" component={About} />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
