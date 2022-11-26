import React from "react";
import _ from "lodash";

interface TableBodyProps {
    data: [] | any;
    columns: {} | any;
}

const TableBody = ({ data, columns }: TableBodyProps) => {
    const renderContent = (item: any, column: any) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[column].path);
    };
    return (
        <tbody>
            {data.map((item: any) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <td key={column}>{renderContent(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;
