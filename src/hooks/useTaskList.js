import { useState, useEffect } from 'react';

export function useTaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const tasksInStorage = localStorage.getItem('task-list');
        if (tasksInStorage) {
            setTasks(JSON.parse(tasksInStorage));
        } else {
            // Si no hay datos en el almacenamiento local, utiliza tareas iniciales
            const initialTasks = [
                { id: 1, finish: true, title: 'Tarea 1', description: '' },
                { id: 2, finish: false, title: 'Tarea 2', description: '' },
                { id: 3, finish: false, title: 'Tarea 3', description: '' },
            ];
            setTasks(initialTasks);
            // También puedes guardar las tareas iniciales en el almacenamiento local aquí
            localStorage.setItem('task-list', JSON.stringify(initialTasks));
        }
    }, []);

    const addTask = (newTask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
    };

    const updateTask = (taskId, updatedTask) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    useEffect(() => {
        localStorage.setItem('task-list', JSON.stringify(tasks));
    }, [tasks]);

    return { tasks, addTask, updateTask, deleteTask };
}
