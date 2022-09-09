import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProfessionsList } from "../../../store/professions";
import { loadQualitiesList } from "../../../store/qualities";
import { getIsLogedIn, getUsersIsLoadingStatus, loadUsersList } from "../../../store/users";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLogedIn = useSelector(getIsLogedIn());
    const usersStatus = useSelector(getUsersIsLoadingStatus());
    useEffect(() => {
        dispatch(loadProfessionsList());
        dispatch(loadQualitiesList());
        if (isLogedIn) {
            dispatch(loadUsersList());
        }
    }, [isLogedIn]);
    if (usersStatus) { return "Loading..."; }
    return children;
};

export default AppLoader;
