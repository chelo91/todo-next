'use client';
import { Checkbox, Input, Stack, IconButton } from '@chakra-ui/react'
import { DeleteIcon, AddIcon } from '@chakra-ui/icons'
import { useTaskList } from '../hooks/useTaskList.js';

export default function ListTodo() {

    const { tasks, addTask, updateTask, deleteTask } = useTaskList();

    const handleInputChange = (index, event) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].title = event.target.value;
        updateTask(updatedTasks[index].id, updatedTasks[index]);
    };

    const handleCheckboxChange = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].finish = !updatedTasks[index].finish;
        updateTask(updatedTasks[index].id, updatedTasks[index]);
    };

    const handleDeleteClick = (index) => {
        const deletedTasks = [...tasks];
        deleteTask(deletedTasks[index].id);
    };

    const handleAddClick = () => {
        addTask({ id: tasks.length + 1, finish: false, title: '', description: '' });
    };

    return (
        <Stack spacing={3}>
            <IconButton aria-label='Delete task' icon={<AddIcon />} onClick={() => handleAddClick()} />

            {tasks.map((task, index) => {
                return (
                    <Stack direction='row' key={task.id}>
                        <Checkbox
                            defaultChecked={task.finish}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <Input
                            variant='flushed'
                            placeholder='Tarea 1'
                            value={task.title}
                            onChange={(event) => handleInputChange(index, event)}
                        />
                        <IconButton aria-label='Delete task' icon={<DeleteIcon />} onClick={() => handleDeleteClick(index)} />
                    </Stack>
                );
            })}
        </Stack>

    )
}