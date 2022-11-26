import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";

interface ProtectedRouteProps {
    component: any;
    children?: React.ReactNode;
    path: string;
}

const ProtectedRoute = ({
    component: Component,
    children,
    ...rest
}: ProtectedRouteProps) => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};

export default ProtectedRoute;
