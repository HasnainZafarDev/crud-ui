"use client";
import React, { useEffect, useState } from "react";
import User from "./User";
import { getUserAPI } from "../services/httpAPIs";
import EditUser from "./EditUser";

const UserList = ({ user }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [responseUser,setResponseUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userResponse = await getUserAPI();
        setUsers(userResponse.data);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [user,responseUser]);

  const deleteUser = (e, id) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/v1/users" + "/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (users) {
        setUsers((prevElement) => {
          return prevElement.filter((user) => user.id !== id);
        });
      }
    });
  };

  const editUser = (e, id) => {
    e.preventDefault();
    setUserId(id);
  };
  return (
    <>
    <div className="container mx-auto my-8 ">
      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                First Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Last Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                EmailId
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {users?.map((user) => (
                <User
                  user={user}
                  key={user.id}
                  deleteUser={deleteUser}
                  editUser={editUser}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
    <EditUser userId={userId} setResponseUser={setResponseUser}/>
    </>
  );
};

export default UserList;
