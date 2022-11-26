import React from "react";

interface BookMarkProps {
    status: boolean;
}

const BookMark: React.FC<BookMarkProps> = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
};

export default BookMark;
