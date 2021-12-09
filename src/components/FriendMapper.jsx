import React, { useState, useEffect } from "react";
import trollFace from "../images/troll-face.jpg";
import "../components/styles/FriendMapper.css";

const FriendsMapper = ({ user, allUsers, setProfile }) => {
  let friendArray = allUsers.filter((friend) =>
    user.friendsList.includes(friend._id)
  );
  console.log(friendArray);

  return (
    <div>
      <div>
        {friendArray.map((friend, index) => (
          <div key={index}>
            <div className="div-mappers" onClick={()=>setProfile(friend)}>
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
              <span className="span-mapper">
                {friend.firstName} {friend.lastName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsMapper;
