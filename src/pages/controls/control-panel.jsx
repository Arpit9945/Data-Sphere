import { Fragment, useEffect } from 'react';
import './/controls.scss';
import { connect } from 'react-redux';
import { SetLogin } from '../../redux/action/actions';
import { Link, useNavigate } from 'react-router-dom';

const Control_panel = (props) => {

    const navigation = useNavigate()

    useEffect(() => {
        console.log(props.AccountDetails);
        
        if (!props.AccountDetails.email && !props.AccountDetails.password) {
            navigation('/login_page');
        }
    }, [])


    const control_data = [
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" height="32" width="36  " viewBox="0 0 576 512">
                <path fill="#B197FC" d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>,
            label: 'Home',
            tooltip: 'home',
            link: '/data_structure'
        }
    ]

    return (

        <div className='ds-control-panel'>
            {control_data.map((data, index) => {
                return (
                    <Fragment key={index}>
                        <Link to={data.link} style={{ textDecoration: 'none' }}>
                            <div className='ds-control-box'>
                                <span>
                                    {data.svg}
                                </span>
                                <p className='ds-control-label'>{data.label}</p>
                                <span className='ds-control-tooltip'>{data.tooltip}</span>
                            </div>
                        </Link>
                    </Fragment>
                )
            })}
        </div>
    )
}

const mapStateData = state => ({
    AccountDetails: state.LoginData,
});

const mapDispatchData = dispatch => ({
    // ds_set_login: (data) => dispatch(SetLogin(data))
});

export default connect(mapStateData, mapDispatchData)(Control_panel);