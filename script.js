// script.js

document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        const registerUser = async (username, password) => {
            try {
                const response = await fetch('http://localhost:5500/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: username, email: password })
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                alert(data.message); // Komunikat z serwera
            } catch (error) {
                console.error('Błąd podczas tworzenia użytkownika:', error);
            }
        };

        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = usernameInput.value;
            const password = passwordInput.value;

            // Wywołanie funkcji registerUser() z danymi z formularza
            registerUser(username, password);
        });
    }
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        const logout = () => {
            window.location.href = 'index.html';
        };

        logoutButton.addEventListener('click', logout);
    }
});
