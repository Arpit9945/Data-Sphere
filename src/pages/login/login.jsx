import { useEffect, useState } from 'react';
import './login.scss';
import { auth, provider, signInWithPopup } from '../../firebase.js';
import { connect } from 'react-redux';
import { SetLogin, SetNotification } from '../../redux/action/actions.js';
import { useNavigate } from 'react-router-dom';


const Login_page = (props) => {

    const [PassType, setPassType] = useState('password');
    const [Username, setUsername] = useState('');
    const [EmailVal, setEmailVal] = useState('');
    const [ShowError, setShowError] = useState(false);
    const [PassError, setPassError] = useState('');
    const [PassVal, setPassVal] = useState('');
    const [ConfirmPass, setConfirmPass] = useState('');
    const [login_type, setLogin_type] = useState('login');
    const [StepCount, setStepCount] = useState('step-1');
    const [DirectLog, setDirectLog] = useState({
        'google': false,
        'facebook': false
    });
    const navigate = useNavigate()
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    // useEffect(() => {
    //     const storedLoginData = localStorage.getItem('ds-userLoginData');

    //     if (storedLoginData) {
    //         props.ds_set_login(JSON.parse(storedLoginData));
    //         navigate('/')
    //     }
    // }, []);


    const handleDirectLogin = (type) => {
        let originalObj = DirectLog;
        let newObj = Object.assign({}, originalObj, { [type]: true });
        setDirectLog(newObj);

        signInWithPopup(auth, provider)
            .then((result) => {
                if (result) {
                    setDirectLog(originalObj);
                }
            })
            .catch((error) => {
                if (error.code === 'auth/popup-closed-by-user') {
                    console.log('The popup was closed by the user before completing the sign in.');
                } else {
                    console.error('Error during sign-in:', error);
                }
                setDirectLog(originalObj);
            });
    };


    const Update_login = (type) => {
        if ('Signup' === type) {
            props.ds_set_notification('Login Succeeded!', "You've logged into your account!", 'success');
        }

    }

    const sawPassword = () => {
        if ('password' === PassType) {
            setPassType('text')
        } else {
            setPassType('password')
        }
    }

    const handleValue = (type) => {

        if ('signup' === type) {

            if (!PassVal.trim() && !ConfirmPass.trim()) {
                setShowError(true);
                setPassError('Kindly fill both correctly');
            } else if (PassVal !== ConfirmPass) {
                setShowError(true);
                setPassError('Password and confirm password must be equal');
            } else {

                setShowError(false);

                let userData = {
                    'username': Username,
                    'email': EmailVal,
                    'password': PassVal
                }
                props.ds_set_login(userData);
                localStorage.setItem('ds-userLoginData', JSON.stringify(userData));
                navigate('/')
                props.ds_set_notification('Login Success!', "WelCome to Data phere!", 'success');
            }
        } else {
            if (regex.test(EmailVal) && Username.trim()) {
                setStepCount('step-2');
                setShowError(false);
            } else {
                setShowError(true);
            }
        }

    }

    return (
        <div className="ds-login-page">
            <div className="ds-login-container">

                <div className='ds-login-via-gb'>
                    <button className='ds-login' disabled={!!DirectLog.google} onClick={() => { handleDirectLogin('google') }} >
                        {DirectLog?.google ?
                            <div class="loading-spinner-inner">
                                <div class="loading-spinner-circle"></div>
                                <div class="loading-spinner-circle"></div>
                                <div class="loading-spinner-circle"></div>
                                <div class="loading-spinner-circle"></div>
                            </div>
                            :
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="#fbbb00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path>
                                    <path fill="#518ef8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path>
                                    <path fill="#28b446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path>
                                    <path fill="#f14336" d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path>
                                </svg>
                                <span>Connect via Google</span>
                            </>
                        }
                    </button>
                    <button className='ds-login' disabled={!!DirectLog.facebook} onClick={() => { handleDirectLogin('facebook') }}>
                        {
                            DirectLog?.facebook ?
                                <div class="loading-spinner-inner">
                                    <div class="loading-spinner-circle"></div>
                                    <div class="loading-spinner-circle"></div>
                                    <div class="loading-spinner-circle"></div>
                                    <div class="loading-spinner-circle"></div>
                                </div>
                                :
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="126.445 2.281 589 589">
                                        <circle cx="420.945" cy="296.781" r="294.5" fill="#3c5a9a"></circle>
                                        <path fill="#fff" d="M516.704 92.677h-65.239c-38.715 0-81.777 16.283-81.777 72.402.189 19.554 0 38.281 0 59.357H324.9v71.271h46.174v205.177h84.847V294.353h56.002l5.067-70.117h-62.531s.14-31.191 0-40.249c0-22.177 23.076-20.907 24.464-20.907 10.981 0 32.332.032 37.813 0V92.677h-.032z"></path>
                                    </svg>
                                    <span>Connect via Facebook</span>
                                </>
                        }
                    </button>
                </div>

                <div className="ds-sign-email">
                    <hr className="ds-line" />
                    <span className="ds-line-text">Or Enter with Email</span>
                    <hr className="ds-line" />
                </div>

                {/* Login and Sign Page */}

                {'login' === login_type ?
                    <>
                        <div className='ds-login-form'>
                            <div className='ds-input-container'>
                                <label htmlFor='ds-email' className='ds-login-label'>Email</label>
                                <input id='ds-email' className='ds-input' type='email' autoComplete="off" value={EmailVal} onChange={(e) => { setEmailVal(e.target.value) }} placeholder='Enter Your Email' />
                            </div>
                            <div className='ds-input-container'>
                                <label htmlFor='ds-password' className='ds-login-label'>Password</label>
                                <span className='ds-pass-content'>
                                    <input id='ds-password' className='ds-input' type={PassType} placeholder='Password' value={PassVal} onChange={(e) => { setPassVal(e.target.value) }} />
                                    {'password' === PassType ?
                                        <svg xmlns="http://www.w3.org/2000/svg" height="14" width="15.75" viewBox="0 0 576 512" onClick={() => { sawPassword() }}>
                                            <path fill='gray' d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512" onClick={() => { sawPassword() }}>
                                            <path fill='gray' d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
                                        </svg>
                                    }

                                </span>
                            </div>
                            <div className='ds-login-req'>
                                <button className='ds-gradient-btn ds-login-btn' onClick={() => { Update_login() }}>Login</button>
                                <p className='ds-signup-link'>Don't Have an Account ? <button onClick={() => { setLogin_type('signup') }}>Sign Up</button></p>
                            </div>
                        </div>
                    </>
                    :
                    <div className='ds-login-form'>

                        {'step-1' === StepCount &&
                            <>
                                <div className='ds-input-container'>
                                    <label htmlFor='ds-email' className='ds-login-label'>Username</label>
                                    <input id='ds-email' className='ds-input' type='text' autoComplete="off" value={Username} onChange={(e) => { setUsername(e.target.value) }} placeholder='Enter Your Email' />
                                    {ShowError && !Username.trim() &&
                                        <p className='ds-loginform-error'>please enter username</p>
                                    }
                                </div>
                                <div className='ds-input-container'>
                                    <label htmlFor='ds-email' className='ds-login-label'>Email</label>
                                    <input id='ds-email' className='ds-input' type='email' autoComplete="off" value={EmailVal} onChange={(e) => { setEmailVal(e.target.value) }} placeholder='Enter Your Email' />
                                    {ShowError && !regex.test(EmailVal) &&
                                        <p className='ds-loginform-error'>please enter valid email</p>
                                    }
                                </div>
                                <div className='ds-step-content'>
                                    <button className='ds-gradient-btn' onClick={() => { handleValue() }}>Next</button>
                                </div>
                            </>
                        }

                        {'step-2' === StepCount &&
                            <>
                                <div className='ds-input-container'>
                                    <label htmlFor='ds-password' className='ds-login-label'>Password</label>
                                    <span className='ds-pass-content'>
                                        <input id='ds-password' className='ds-input' type={PassType} placeholder='Password' value={PassVal} onChange={(e) => { setPassVal(e.target.value) }} />
                                        {'password' === PassType ?
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="15.75" viewBox="0 0 576 512" onClick={() => { sawPassword() }}>
                                                <path fill='gray' d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512" onClick={() => { sawPassword() }}>
                                                <path fill='gray' d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
                                            </svg>
                                        }


                                    </span>
                                    {
                                        ShowError && PassError &&
                                        <p className='ds-loginform-error'>{PassError}</p>
                                    }
                                </div>
                                <div className='ds-input-container'>
                                    <label htmlFor='ds-password' className='ds-login-label'>Confirm Password</label>
                                    <span className='ds-pass-content'>
                                        <input id='ds-password' className='ds-input' type={PassType} placeholder='Password' value={ConfirmPass} onChange={(e) => { setConfirmPass(e.target.value) }} />
                                        {'password' === PassType ?
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="15.75" viewBox="0 0 576 512" onClick={() => { sawPassword() }}>
                                                <path fill='gray' d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512" onClick={() => { sawPassword() }}>
                                                <path fill='gray' d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
                                            </svg>
                                        }
                                    </span>
                                    {
                                        ShowError && PassError &&
                                        <p className='ds-loginform-error'>{PassError}</p>
                                    }
                                </div>
                                <div className='ds-tnc'>
                                    <input id='tandc' type='checkbox' className='ds-checkbox' />
                                    <label htmlFor='tandc'>
                                        Agree with Terms and conditions of Data Sphere
                                    </label>
                                </div>
                                <button className='ds-gradient-btn ds-login-btn' onClick={() => { handleValue('signup') }}>Sign Up</button>
                            </>
                        }

                        <div className='ds-login-req'>
                            <p className='ds-signup-link'>Already Have an Account ? <button onClick={() => { setLogin_type('login') }}>Login</button></p>
                        </div>
                    </div>

                }

            </div>
        </div>
    )
}

const get_login_data = state => ({
    AccountDetails: state.LoginData,
    ShowToast: state.ShowNotification
});

const mapsetLoginData = dispatch => ({
    ds_set_login: (data) => dispatch(SetLogin(data)),
    ds_set_notification: (massage, description, type) => dispatch(SetNotification(massage, description, type)),
});

export default connect(get_login_data, mapsetLoginData)(Login_page);
