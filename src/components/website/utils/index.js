
export const login = (props, d) => {
    if (d.username === 'user' && d.password === 'password') {
        localStorage.setItem('auth', d)
        props.history.push('/home');
    }
}

// LOGOUT
export const logout = () => localStorage.removeItem('auth')

// LOGIN STATUS
export const isLogin = () => {
    if (localStorage.getItem('auth')) return true;
    return false;
}