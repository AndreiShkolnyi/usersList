import React, { useEffect } from "react";
import Quality from "./quality";
import {
    getQualitiesLoadingStatus,
    getQulitiesByIds,
    loadQualitiesList
} from "../../../store/qualities";
import { useDispatch, useSelector } from "react-redux";
import { IQuality } from "../../../types/types";

interface QualitiesListProps {
    qualities: [IQuality];
}

const QualitiesList = ({ qualities }: QualitiesListProps) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQulitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isLoading) return <h1>Loadind ...</h1>;

    return (
        <>
            {qualitiesList.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

export default QualitiesList;
