// script.js

const apiUrl = 'http://localhost:5500/api/users';

const createUser = async (username, password) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log(data.message); // Komunikat z serwera
    } catch (error) {
        console.error('Błąd podczas tworzenia użytkownika:', error);
    }
};

// Wywołanie funkcji createUser() po kliknięciu przycisku "Zarejestruj"
const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    createUser(username, password);
});
