const SetLogin = (data) => {
    return {
        type: 'SET_LOGIN_DETAIL',
        data: data
    };
};

const SetNotification = (massage, description, type) => {
    return {
        type: 'SET_TOAST_MESSAGE',
        data: {
            massage,
            description,
            type
        }
    };
};

export { SetLogin, SetNotification };
