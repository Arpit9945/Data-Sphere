import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SetNotification } from "../../redux/action/actions";

const Show_toast = (props) => {


    const [dynamicClass, setDynamicClass] = useState('ds-notification-popup close');
    let msg = props?.Notification?.massage,
        description = props?.Notification?.description,
        type = props?.Notification?.type;

    useEffect(() => {
        if (msg) {
            if (props.Notification.type === 'success') {
                setDynamicClass('ds-notification-popup success');
            } else {
                setDynamicClass('ds-notification-popup danger');
            }

            setTimeout(() => {
                setDynamicClass('ds-notification-popup close');

                setTimeout(() => {
                    props.ds_set_notification('');
                }, 500);

            }, 5000);


        }
    }, [props.Notification]);

    if (msg) {
        return (
            <div className={dynamicClass}>
                <span className="ds-toast-svg">
                    {'success' === type ?
                        <svg width="45" height="50" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M37.3731 22.4881L37.3614 22.4939C35.9903 23.5454 35.4094 25.3347 35.8974 26.9905L35.9032 27.0021C36.6816 29.6338 34.753 32.2887 32.0108 32.3585H31.9992C30.268 32.4049 28.7459 33.5087 28.1707 35.1412V35.147C27.2527 37.738 24.1273 38.7546 21.8674 37.1918C20.4641 36.2336 18.6091 36.1836 17.1327 37.1918H17.1269C14.867 38.7488 11.7415 37.7379 10.8294 35.1411C10.2491 33.5046 8.72922 32.4048 7.00094 32.3584H6.9893C4.24727 32.2886 2.31844 29.6338 3.09695 27.0021L3.10273 26.9904C3.59063 25.3346 3.00969 23.5453 1.63875 22.4938L1.62711 22.4881C-0.551484 20.8149 -0.551484 17.5384 1.62711 15.8653L1.63875 15.8595C3.00969 14.808 3.59063 13.0186 3.09695 11.3629V11.3513C2.31258 8.71963 4.24719 6.06463 6.9893 5.99494H7.00094C8.72633 5.94846 10.2542 4.84463 10.8294 3.21221V3.20642C11.7414 0.615409 14.867 -0.401232 17.1269 1.16158H17.1327C18.5559 2.14338 20.4382 2.14338 21.8674 1.16158C24.1501 -0.414747 27.2581 0.630956 28.1707 3.20642V3.21221C28.7459 4.83885 30.2679 5.94853 31.9992 5.99494H32.0108C34.7529 6.06463 36.6816 8.71963 35.9032 11.3513L35.8974 11.3629C35.4094 13.0186 35.9903 14.808 37.3614 15.8595L37.3731 15.8653C39.5516 17.5384 39.5516 20.8149 37.3731 22.4881Z" fill="#3EB655" /><path d="M19.5004 29.9987C25.477 29.9987 30.322 25.1537 30.322 19.1771C30.322 13.2005 25.477 8.35547 19.5004 8.35547C13.5237 8.35547 8.67871 13.2005 8.67871 19.1771C8.67871 25.1537 13.5237 29.9987 19.5004 29.9987Z" fill="#8BD399" /><path opacity="0.1" d="M27.8093 12.2486C25.9375 10.7087 23.5428 9.7832 20.9321 9.7832C14.9556 9.7832 10.1079 14.6309 10.1079 20.6074C10.1079 23.218 11.0335 25.6128 12.5732 27.4846C10.195 25.5008 8.68018 22.5166 8.68018 19.1755C8.68018 13.1989 13.5237 8.35547 19.5003 8.35547C22.8413 8.35547 25.8255 9.87031 27.8093 12.2486Z" fill="black" /><path d="M16.9257 23.4117L14.5327 20.8658C13.906 20.1989 13.9383 19.1504 14.6049 18.5237C15.2716 17.8962 16.3206 17.9298 16.9467 18.5962L18.0891 19.8111L22.9448 14.2612C23.5467 13.5725 24.5935 13.5026 25.2828 14.1054C25.9716 14.7081 26.0411 15.7547 25.4387 16.4434L19.3797 23.368C18.7342 24.105 17.5951 24.1243 16.9257 23.4117Z" fill="white" />
                        </svg>
                        :
                        <svg width="45" height="50" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.96273 4.14568L3.14055 14.2293C3.03538 14.4114 2.98 14.6179 2.97998 14.8282C2.97996 15.0385 3.0353 15.2451 3.14044 15.4272C3.24557 15.6093 3.3968 15.7605 3.57891 15.8657C3.76102 15.9708 3.96761 16.0262 4.17789 16.0261H15.8213C16.0316 16.0262 16.2382 15.9708 16.4203 15.8657C16.6024 15.7605 16.7536 15.6093 16.8588 15.4272C16.9639 15.2451 17.0193 15.0385 17.0192 14.8282C17.0192 14.6179 16.9638 14.4114 16.8587 14.2293L11.0371 4.14568C10.932 3.96362 10.7808 3.81244 10.5987 3.70732C10.4167 3.60221 10.2102 3.54688 9.99992 3.54688C9.78969 3.54688 9.58317 3.60221 9.40111 3.70732C9.21904 3.81244 9.06785 3.96362 8.96273 4.14568Z" fill="#EE404C" /><path d="M10.076 7.25391H9.9241C9.55019 7.25391 9.24707 7.55702 9.24707 7.93094V11.167C9.24707 11.5409 9.55019 11.8441 9.9241 11.8441H10.076C10.4499 11.8441 10.753 11.5409 10.753 11.167V7.93094C10.753 7.55702 10.4499 7.25391 10.076 7.25391Z" fill="#FFF7ED" /><path d="M10 14.4122C10.4159 14.4122 10.753 14.0751 10.753 13.6592C10.753 13.2434 10.4159 12.9062 10 12.9062C9.58419 12.9062 9.24707 13.2434 9.24707 13.6592C9.24707 14.0751 9.58419 14.4122 10 14.4122Z" fill="#FFF7ED" />
                        </svg>
                    }
                </span>
                <div className="ds-toast-content">
                    <p className="ds-notification-heading">{msg}</p>
                    <p className="ds-notification-desc">{description}</p>
                </div>
                {/* <span className="ds-notification-close" onClick={() => { setDynamicClass('ds-notification-popup close') }}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.75 6.25L6.25 18.75" stroke="black" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6.25 6.25L18.75 18.75" stroke="black" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span> */}
            </div>
        );
    }
};

const mapStateToShowToast = state => ({
    Notification: state.ShowNotification,
});


const mapDispatchToNotification = dispatch => ({
    ds_set_notification: (massage, description, type) => dispatch(SetNotification(massage, description, type)),
});

export default connect(mapStateToShowToast, mapDispatchToNotification)(Show_toast);
