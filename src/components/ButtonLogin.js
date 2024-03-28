import React from 'react';
import { Button } from "@chakra-ui/react";

function LoginForm() {
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        // Here you can perform any additional actions before submitting the form
        // For example, you can make a request to your API
        fetch('http://api.carpincho.dev/auth/github', {
            method: 'POST',
            // You can add headers or body payload if needed
        })
            .then((response) => {
                console.log(response)
                // Handle response if necessary
            })
            .catch((error) => {
                console.log(error)

                // Handle error if necessary
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Button type="submit" colorScheme='blackAlpha'>
                Iniciar sesión con Github
            </Button>
        </form>
    );
}

export default LoginForm;
