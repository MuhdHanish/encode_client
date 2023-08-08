import React, { useEffect, useState, useCallback } from 'react';
import { User } from '../../../dtos/User';
import { blockTheUser, getFullUsers, unBlockTheUser } from '../../../utils/userUtils';
import { UsersCard } from '../../Common/CardCompnent/CardCompoent';

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
      .catch((err) => console.log(err));
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

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  const blockUser = (id: string) => {
    blockTheUser(id).then((res) => { if(res)fetchUsers(); return }).catch(err => console.log(err));
  }

  const unBlockUser = (id: string) => {
    unBlockTheUser(id).then((res) => { if(res)fetchUsers(); return }).catch(err => console.log(err));
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white relative overflow-hidden">
      <div className="flex w-full p-5 h-fiit justify-between items-center">
        <div className="flex w-full h-full  justify-start">
          <select
            className="appearance-none bg-white border border-gray-300 rounded py-2 px-4  text-gray-700 leading-tight focus:outline-none focus:border-primary"
            name="userStatus"
            id="userStatus"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="option1">All Users</option>
            <option value="option2">Blocked</option>
            <option value="option3">Unblocked</option>
          </select>
        </div>
        <div className="flex w-full h-full justify-end">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search"
            className="appearance-none bg-white border border-gray-300 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="flex h-full w-full flex-wrap p-2 justify-start items-start">
        {filteredUserList.map((user, idx) => (
          <div className="flex w-fit" key={idx}>
            <UsersCard
              user={user}
              blockUser={blockUser}
              unBlockUser={unBlockUser}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
