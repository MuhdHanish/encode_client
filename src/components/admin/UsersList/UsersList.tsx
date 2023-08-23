import React, { useEffect, useState, useCallback } from 'react';
import { User } from '../../../dtos/User';
import { blockTheUser, getFullUsers, unBlockTheUser } from '../../../utils/userUtils';
import { UsersCard } from '../../Common/CardCompnent/CardCompoent';
import { toast } from "react-toastify";
import Pagination from '../../Common/Pagination/Pagination';
import SearchInput from '../../Common/SearchInput/SearchInput';
import UserFilter from './UserFilter/UserFilter';

const UsersList: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUserList, setFilteredUserList] = useState<User[]|[]>([]);

  const fetchUsers = useCallback(() => {
    getFullUsers()
      .then((res) => {
        setUsers(res as User[]);
      })
      .catch((err) => {
        toast.error(err as string, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, []);

  useEffect(() => {
    const filteredList = users.filter((user) => {
      const usernameMatch = user.username
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const emailMatch = user.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      if (selectedOption === "option2") {
        return (usernameMatch || emailMatch) && user.status === false;
      } else if (selectedOption === "option3") {
        return (usernameMatch || emailMatch) && user.status === true;
      } else {
        return usernameMatch || emailMatch;
      }
    });
     setFilteredUserList(filteredList);
  }, [searchQuery, users, selectedOption]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const postPerPage = 12 ;
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const [currentPosts, setCurrentPosts] = useState<User[] | []>([]);
    useEffect(() => {
      setCurrentPosts(filteredUserList.slice(firstPostIndex, lastPostIndex));
    }, [filteredUserList, firstPostIndex, lastPostIndex]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  const blockUser = (id: string) => {
    blockTheUser(id).then((res) => { if (res) fetchUsers(); return }).catch(err => {
      toast.error(err as string, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }

  const unBlockUser = (id: string) => {
    unBlockTheUser(id).then((res) => { if (res) fetchUsers(); return }).catch(err => {
      toast.error(err as string, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }
  return (
    <div className="w-full h-full flex flex-col  overflow-x-hidden">
      <div className="flex w-full h-fit justify-between items-center p-5 ">
        <UserFilter selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full  p-5 ">
        { currentPosts.length > 0 ?  currentPosts.map((user, idx) => (
          <UsersCard
            key={idx}
            user={user}
            blockUser={blockUser}
            unBlockUser={unBlockUser}
          />
        )) : (<span>No users found !</span>) }
      </div>
      {filteredUserList.length > postPerPage && (
        <div className="flex w-full h-full p-5 justify-center items-end ">
          <Pagination
            postsPerPage={postPerPage}
            totalPosts={filteredUserList?.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
}

export default UsersList;