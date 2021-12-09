import React, { useState, useEffect } from "react";
import axios from "axios";
import trollFace from "../images/troll-face.jpg";
import "./styles/PendingFriendMapper.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

const PendingFriendsMapper = ({ user, setRequest, setProfile, allUsers, getAllUsers }) => {
  const acceptFriendRequest = async (request) => {
    await axios.post(
      `http://localhost:5000/api/users/${user._id}/pending/${request._id}`,
      null,
      { headers: { "x-auth-token": localStorage.getItem("token") } }
    ).then((res)=> {
      getAllUsers();
    })
  };
  const denyFriendRequest = async (request) => {
    await axios
      .delete(
        `http://localhost:5000/api/users/${user._id}/remove/${request._id}`,
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        getAllUsers();
      });
  };

  let friendPending = allUsers.filter((friend) =>
    user.pendingRequest.includes(friend._id)
  );
  console.log(friendPending);

  return (
    <div>
      <div>
        {friendPending.map((friend, index) => (
          <div key={index}>
            <div className="div-mappers" onClick={() => setProfile(friend)}>
              {!friend.image ? (
                <img
                  src={trollFace}
                  className="friend-image-mapper"
                  width="75"
                  alt="trollUser"
                />
              ) : (
                <img
                  src={`http://localhost:5000/${friend.image}`}
                  className="friend-image-mapper"
                  width="75"
                  alt={`${friend.firstName}'s picture`}
                />
              )}
              <span className="span-mapper-pending">
                {friend.firstName} {friend.lastName}
              </span>
              <span>
                <div>
                  <CheckCircleIcon onClick={()=>acceptFriendRequest(friend)} fontSize="large"/>
                </div>
                <div>
                <DoNotDisturbIcon onClick={()=>denyFriendRequest(friend)} fontSize="large"/>
                </div>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingFriendsMapper;
