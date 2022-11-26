import React from "react";

interface QualityProps {
    _id: string;
    color: string;
    name: string;
}

const Quality = ({ _id, color, name }: QualityProps) => {
    return (
        <span className={"badge m-1 bg-" + color} key={_id}>
            {name}
        </span>
    );
};

export default Quality;
