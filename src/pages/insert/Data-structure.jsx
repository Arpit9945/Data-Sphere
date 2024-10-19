import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Data_Structure = (props) => {
    console.log(props);

    const navigation = useNavigate();
    
    useEffect(() => {
        console.log(props.AccountDetails);
        
        if (!props.AccountDetails.email && !props.AccountDetails.password) {
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
