import React from "react";

interface TableHeaderProps {
    onSort: ({}) => void;
    selectedSort: {} | any;
    columns: {} | any;
}

const TableHeader = ({ onSort, selectedSort, columns }: TableHeaderProps) => {
    const handleSort = (item: {}) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    const rendeSortArrow = (selectedSort: {} | any, currentPath: string) => {
        if (selectedSort.path === currentPath) {
            if (selectedSort.order === "asc") {
                return <i className="bi bi-caret-down-fill"></i>;
            } else {
                return <i className="bi bi-caret-up-fill"></i>;
            }
        }
        return null;
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}{" "}
                        {rendeSortArrow(selectedSort, columns[column].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
