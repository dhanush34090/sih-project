// Set VITE_API_URL in a .env file (or in your host's environment settings) to point
// this at your deployed backend. Falls back to localhost for local development.
const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/auth`;

export async function loginUser(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password');
    }

    return data;
}

export async function signupUser(name, email, password, role = 'USER') {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password,
            role
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
    }

    return data;
}