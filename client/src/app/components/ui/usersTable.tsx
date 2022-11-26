import React from "react";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";
import { IUser } from "../../types/types";

interface UserTableProps {
    users: [IUser] | any;
    onSort: (item: any) => void;
    selectedSort: {};
    onDelete?: (userId: string) => void;
}

const UserTable = ({
    users,
    onSort,
    selectedSort,
    ...rest
}: UserTableProps) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user: IUser) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user: IUser) => <Qualities qualities={user.qualities} />
        },
        professions: {
            name: "Профессия",
            component: (user: IUser) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" }
        // bookmark: {
        //     path: "bookmark",
        //     name: "Избранное",
        //     component: (user: IUser) => (
        //         <BookMark
        //             status={user.bookmark}
        //             onClick={() => onToggleBookMark(user._id)}
        //         />
        //     )
        // }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

export default UserTable;
