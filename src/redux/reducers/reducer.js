const loginData = {
    username: '',
    email: '',
    password: ''
}

const toastMessage = {
    massage: '',
    description: '',
    type: ''
};


export default function LoginData(state = loginData, action) {

    switch (action.type) {
        case 'SET_LOGIN_DETAIL':
            return {
                ...state,
                username: action.data.username,
                email: action.data.email,
                password: action.data.password
            };
        default:
            return state;
    }
}


export function ShowNotification(state = toastMessage, action) {
    switch (action.type) {
        case 'SET_TOAST_MESSAGE':
            return {
                ...state,
                massage: action.data.massage, 
                description: action.data.description,
                type: action.data.type
            };
        default:
            return state;
    }
}
