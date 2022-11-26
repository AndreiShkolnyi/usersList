import React from "react";
import { useSelector } from "react-redux";
import {
    getProfessionbyId,
    getProfessionsLoadingStatus
} from "../../store/professions";

interface ProfessionProps {
    id: any;
}

const Profession = ({ id }: ProfessionProps) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionbyId(id));
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return <h1>loading ...</h1>;
};

export default Profession;
