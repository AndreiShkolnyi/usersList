import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfession, getProfessionsLoadingStatus } from "../../store/professions";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfession(id));
    console.log(prof);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
