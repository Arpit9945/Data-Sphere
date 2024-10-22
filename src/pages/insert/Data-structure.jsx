import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Data_Structure = (props) => {

    const navigation = useNavigate();
    
    
    useEffect(() => {        
        if (!props.AccountDetails.LoginData.email && !props.AccountDetails.LoginData.password) {
            navigation('/login_page');
        }
    }, [])

    return (
        <div>
            <h1>Login Details</h1>
        </div>
    );
}

const mapStateToProps = (state) => ({
    AccountDetails: state, 
});

export default connect(mapStateToProps)(Data_Structure);
