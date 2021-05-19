import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: "Doctors Appointment",
            day: "Feb 5th at 2:30pm",
            reminder: true,
        },
        {
            id: 2,
            text: "Meeting at School",
            day: "Feb 6th",
            reminder: true,
        },
        {
            id: 3,
            text: "Getting Groceries",
            day: "Feb 10th",
            reminder: true,
        },
    ]);

    //Add Task
    const addTask = (task) => {
      const id = tasks.length + 1;
      
      const newTask = { id, ...task }
      //Because components in react are not mutable. So we must copy 
      setTasks([...tasks, newTask]) //copy the previous task and add new onto it
      
    }

    //Delete Task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    //Toggle Reminder
    const toggleReminder = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: !task.reminder } : task
            )
        );
    };

    return (
        <div className="container">
            <Header onAdd={( ) => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
            {/*Short way of doing ternary without an else */}
            {showAddTask && <AddTask onAdd = {addTask}/>}
            {tasks.length > 0 ? (
                <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                />
            ) : (
                "No Task to Show"
            )}
        </div>
    );
}

export default App;
