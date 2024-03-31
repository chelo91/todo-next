"use client"
import React, { useEffect } from 'react';
import { useToastNotification } from '@/hooks/useToastNotification.js';

function ToastNotification() {
    const { addToast } = useToastNotification();

    useEffect(() => {
        // Call addToast with your notification object
        // Obtener la URL actual
        const urlParams = new URLSearchParams(window.location.search);
        // Verificar si el campo específico está presente en la URL
        let action = urlParams.get('action') == null ? '' : urlParams.get('action');
        const msg = urlParams.get('msg') == null ? '' : urlParams.get('msg');
        const type = urlParams.get('type') == null ? 'success' : urlParams.get('type');
        const title = action.charAt(0).toUpperCase() + action.slice(1);

        if (msg !== '') {
            addToast({ title: title, msg: msg, type: type });
            window.history.replaceState({}, '', window.location.pathname);
        }
    }, []);
}

export default ToastNotification;