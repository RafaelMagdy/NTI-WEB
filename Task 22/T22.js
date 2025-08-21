const AuthState = {
    currentUser: null
};

function setCurrentUser(userData) {
    AuthState.currentUser = userData;
    updateUI();
}

function logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_info');
    setCurrentUser(null);
    showMessage('You have been logged out.', 'bg-yellow-200 text-yellow-800');
}

function autoLogin() {
    const token = localStorage.getItem('jwt_token');
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    
    if (token && userInfo) {
        showMessage('Welcome back! You have been automatically logged in.', 'bg-green-200 text-green-800');
        setCurrentUser(userInfo);
    }
}

const fakeDatabase = {};

function generateFakeJwt(userData) {
    const header = btoa(JSON.stringify({ "alg": "HS256", "typ": "JWT" }));
    const payload = btoa(JSON.stringify(userData));
    const signature = "fake-signature";
    return `${header}.${payload}.${signature}`;
}

async function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    showMessage('Signing up...', 'bg-gray-200 text-gray-800');

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (fakeDatabase[email]) {
            showMessage('Error: User with this email already exists.', 'bg-red-200 text-red-800');
            return;
        }

        fakeDatabase[email] = { name, email, password };
        
        const userData = { id: Date.now(), name, email };
        const token = generateFakeJwt(userData);
        
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_info', JSON.stringify(userData));
        
        setCurrentUser(userData);
        showMessage('Sign up successful! You are now logged in.', 'bg-green-200 text-green-800');
        document.getElementById('signup-form').reset();

    } catch (error) {
        showMessage('An error occurred during sign up. Please try again.', 'bg-red-200 text-red-800');
        console.error('Signup failed:', error);
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    showMessage('Logging in...', 'bg-gray-200 text-gray-800');

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const userInDb = fakeDatabase[email];
        if (!userInDb || userInDb.password !== password) {
            showMessage('Error: Invalid email or password.', 'bg-red-200 text-red-800');
            return;
        }

        const userData = { id: userInDb.id || Date.now(), name: userInDb.name, email: userInDb.email };
        const token = generateFakeJwt(userData);
        
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_info', JSON.stringify(userData));
        
        setCurrentUser(userData);
        showMessage('Login successful! Welcome back.', 'bg-green-200 text-green-800');
        document.getElementById('login-form').reset();

    } catch (error) {
        showMessage('An error occurred during login. Please try again.', 'bg-red-200 text-red-800');
        console.error('Login failed:', error);
    }
}

async function handleProtectedAction() {
    const token = localStorage.getItem('jwt_token');

    if (!token) {
        showMessage('You must be logged in to perform this action.', 'bg-red-200 text-red-800');
        return;
    }

    showMessage('Fetching protected content...', 'bg-gray-200 text-gray-800');

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showMessage('Protected content accessed successfully!', 'bg-blue-200 text-blue-800');
        
    } catch (error) {
        showMessage('Failed to access protected content. Your session may have expired.', 'bg-red-200 text-red-800');
        console.error('Protected action failed:', error);
    }
}

function showMessage(text, classes) {
    const messageArea = document.getElementById('message-area');
    if (messageArea) {
        messageArea.textContent = text;
        messageArea.className = `text-center mb-4 p-2 rounded-lg text-sm transition-all duration-300 ${classes}`;
    }
}

function updateUI() {
    const authForms = document.getElementById('auth-forms');
    const authenticatedArea = document.getElementById('authenticated-area');
    const userInfoDisplay = document.getElementById('user-info');
    
    if (AuthState.currentUser) {
        if (authForms) authForms.classList.add('hidden');
        if (authenticatedArea) {
            authenticatedArea.classList.remove('hidden');
            authenticatedArea.classList.add('scale-100', 'opacity-100');
        }
        if (userInfoDisplay) {
            userInfoDisplay.textContent = `${AuthState.currentUser.name} (${AuthState.currentUser.email})`;
        }
    } else {
        if (authenticatedArea) authenticatedArea.classList.add('hidden');
        if (authForms) {
            authForms.classList.remove('hidden');
            authForms.classList.add('scale-100', 'opacity-100');
        }
        if (userInfoDisplay) {
            userInfoDisplay.textContent = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const protectedActionBtn = document.getElementById('protected-action-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (signupForm) signupForm.addEventListener('submit', handleSignup);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (protectedActionBtn) protectedActionBtn.addEventListener('click', handleProtectedAction);
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    autoLogin();
});
