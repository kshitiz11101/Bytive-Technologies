import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, updateUser } from '../apiClient';
import './page.css';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import { FcLike } from 'react-icons/fc';
import { CiEdit, CiGlobe } from 'react-icons/ci';
import { MdDelete, MdOutlineEmail, MdOutlineLocalPhone } from 'react-icons/md';

const Page = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      // console.log('Fetched users:', data); // Debug log to check the structure
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditClick = (user) => {
    // console.log('Edit button clicked for user:', user); // Debug log
    setEditingUser(user);
    setUserData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    });
    // console.log('Editing user set to:', user); // Debug log
  };

  const handleDeleteClick = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUpdateUser = async () => {
    try {
      // Ensure userId is correctly accessed
      const userourId = editingUser.user.userId;
      await updateUser(userourId, userData);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const getAvatarUrl = (seed) => {
    const avatar = createAvatar(adventurer, { seed });
    return avatar.toDataUriSync();
  };

  return (
    <div>
      {/* <h1>Users</h1> */}
      <div className='user-grid'>
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <img
              src={getAvatarUrl(user.name)}
              alt="avatar"
              height="120"
              width="120"
           
            />
            <h4>{user.name}</h4>
            <p><MdOutlineEmail size={20} className='icon' />{user.email}</p>
            <p><MdOutlineLocalPhone size={20} className='icon' />{user.phone}</p>
            <p><CiGlobe size={20} className='icon' />{user.website}</p>
            <div className='user-icons'>
            <FcLike className='icon' size={30} style={{ cursor: 'pointer' }} />
            <CiEdit className='icon' size={30} style={{ cursor: 'pointer' }} onClick={() => handleEditClick(user)} />
            <MdDelete className='icon' size={30} style={{ cursor: 'pointer' }} onClick={() => handleDeleteClick(user.userId)} />
          </div>
          </div>
        ))}
      </div>
      {editingUser && (
        <div className="edit-form">
          <h2>Edit User</h2>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
          />
          <input
            type="text"
            name="website"
            value={userData.website}
            onChange={handleInputChange}
            placeholder="Website"
          />
          <button onClick={handleUpdateUser} style={{ color: 'white', backgroundColor: 'blue' }}>Submit</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Page;
