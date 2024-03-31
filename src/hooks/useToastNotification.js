import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

export function useToastNotification() {
    const [toastNotification, setToastNotification] = useState(null);
    const toast = useToast();

    useEffect(() => {
        if (toastNotification) {
            // Mostrar el toast si hay una notificación
            toast({
                title: toastNotification.title,
                description: toastNotification.msg,
                status: toastNotification.type,
                duration: 9000,
                isClosable: true,
            });

            // Clear the toast notification after displaying
            setToastNotification(null);
        }
    }, [toastNotification, toast]);

    const addToast = (newToast) => {
        // Establecer la nueva notificación
        setToastNotification(newToast);
    };

    return { addToast };
}
