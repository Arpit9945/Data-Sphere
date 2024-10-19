const loginData = {
    email: '',
    password: ''
}

export default function LoginData(state = loginData, action) {
    
    switch (action.type) {
        case 'SET_LOGIN_DETAIL':
            return {
                ...state,
                email: action.data.email,
                password: action.data.password
            };
        default:
            return state;
    }
}
