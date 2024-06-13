import axios from 'axios';
const API_URL="http://localhost:8800/api-v1/users";

export const getAllUsers=async()=>{
    const res=await axios.get(`${API_URL}/`);
    console.log(res.data);
    return res.data;
};
export const updateUser=async(userId,userData)=>{
    const res=await axios.put(`${API_URL}/update-user`,userData,{
    headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    });
    console.log('User updated successfully',res.data);
    return res.data;
}
export const deleteUser = async (userId) => {
    const response = await axios.delete(`${API_URL}/delete-user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log('User deleted successfully',res.data);
    return response.data;
  };