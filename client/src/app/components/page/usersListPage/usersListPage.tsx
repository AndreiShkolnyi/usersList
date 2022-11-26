import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUsersList } from "../../../store/users";
import { IUser } from "../../../types/types";
const UsersListPage = () => {
    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());

    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProf, setSelectedProf] = useState<any>({});
    const [sortBy, setSortBy] = useState<any>({ path: "name", order: "asc" });
    const pageSize = 8;

    // const handleDelete = (userId: string) => {};
    // const handleToggleBookMark = (id: string) => {
    //     const newArray = users.map((user: any) => {
    //         if (user._id === id) {
    //             return { ...user, bookmark: !user.bookmark };
    //         }
    //         return user;
    //     });
    //     // setUsers(newArray);
    //     console.log(newArray);
    // };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleProfessionSelect = (item: any) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };
    const handleSearchQuery = ({ target }: any) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

    const handlePageChange = (pageIndex: number) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item: any) => {
        setSortBy(item);
    };

    function filterUsers(data: any) {
        const filteredUsers = searchQuery
            ? data.filter(
                  (user: IUser) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedProf
            ? data.filter((user: IUser) => user.profession === selectedProf._id)
            : data;
        return filteredUsers.filter((u: IUser) => u._id !== currentUserId);
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf(null);
    };

    return (
        <div className="d-flex">
            {professions && !professionsLoading && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очиститть
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                <input
                    type="text"
                    name="searchQuery"
                    placeholder="Search..."
                    onChange={handleSearchQuery}
                    value={searchQuery}
                />
                {count > 0 && (
                    <UserTable
                        users={usersCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default UsersListPage;
