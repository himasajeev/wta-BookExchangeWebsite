import React from 'react';
import {withRouter} from 'react-router-dom';

const Logout = (props) => {
    localStorage.removeItem('username');
    props.history.push('/');
    return(
        <div></div>
    );
}

export default withRouter(Logout);