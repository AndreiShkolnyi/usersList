import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import { IUser } from "../../../types/types";

interface TableProps {
    onSort: (item: any) => void;
    selectedSort: {};
    columns: {};
    data: [] | IUser[];
    children?: React.ReactNode;
}

const Table = ({
    onSort,
    selectedSort,
    columns,
    data,
    children
}: TableProps) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader {...{ onSort, selectedSort, columns }} />
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </table>
    );
};

export default Table;
