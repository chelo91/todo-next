'use client';
import { Checkbox, Input, Stack, IconButton, Button, Skeleton } from '@chakra-ui/react'
import { DeleteIcon, AddIcon } from '@chakra-ui/icons'
import { useListsItems } from '../hooks/useListsItems.js';

export default function ListTodo() {
    const { items, addItem, updateItem, deleteItem, syncItems, loading, guestMode } = useListsItems();

    const handleInputChange = (index, event) => {
        const updatedItem = items[index];
        updatedItem.text = event.target.value;
        updateItem(updatedItem);
    };

    const handleCheckboxChange = (index) => {
        const updatedItem = items[index];
        updatedItem.check = !updatedItem.check;
        updateItem(index, updatedItem);
    };

    const handleDeleteClick = (index) => {
        const deletedItem = items[index];
        deleteItem(deletedItem);
    };

    const handleAddClick = () => {
        addItem({ check: false, text: '' });
    };

    const handleSaveClick = async () => {
        syncItems()
    };
    if (!loading) {
        return (
            <Stack spacing={3}>
                <Button isDisabled={guestMode} onClick={async () => handleSaveClick()}>Save</Button>
                <IconButton aria-label='Add item' icon={<AddIcon />} onClick={() => handleAddClick()} />
                {items.map((item, index) => {
                    if (item.deleted !== true) {
                        return (
                            <Stack direction='row' key={index}>
                                <Checkbox
                                    defaultChecked={item.check}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <Input
                                    variant='flushed'
                                    placeholder='Tarea 1'
                                    value={item.text}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                                <IconButton aria-label='Delete task' icon={<DeleteIcon />} onClick={() => handleDeleteClick(index)} />
                            </Stack>
                        );
                    }
                })
                }
            </Stack>
        )
    } else {
        return (
            <Stack spacing={3}>
                <Stack direction='row' >
                    <Skeleton height="40px" width="100%" />
                </Stack>
                <Stack direction='row' >
                    <Skeleton height="40px" width="100%" />
                </Stack>
                <Stack direction='row' >
                    <Skeleton height="40px" width="100%" />
                </Stack>
                <Stack direction='row' >
                    <Skeleton height="40px" width="100%" />
                </Stack>
            </Stack>
        )
    }
}