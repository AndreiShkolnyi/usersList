import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getIsLogedIn } from "../../store/users";
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const isLogedIn = useSelector(getIsLogedIn());

    return (<Route {...rest} render={(props) => {
        if (!isLogedIn) {
           return <Redirect to={{
 pathname: "/login",
state: {
            from: props.location
           }
}}/>;
        }
        return Component ? <Component {...props}/> : children;
    }}/>);
};

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    location: PropTypes.object
};

export default ProtectedRoute;
