import React, { useState, useEffect } from "react";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import trollFace from "../images/troll-face.jpg";
import "../components/styles/ProfilePhoto.css";

const ProfilePhoto = ({ profile, user }) => {
  return (
    <div>
      {!profile.image ? (
        <img
          src={trollFace}
          className="photo-style"
          width="250"
          alt="trollUser"
        />
      ) : (
        <img
          src={`http://localhost:5000/${profile.image}`}
          className="photo-style"
          width="250"
          alt={`${profile.firstName}'s picture`}
        />
      )}
      <div className="grid">
        <div className="diver">
          <span className="style-profile-name">
            {profile.firstName} {profile.lastName}
          </span>

          {profile !== user ? null : (
            <span>
              <button className="our-button add-photo-button">
                <AddToPhotosIcon fontSize="medium"></AddToPhotosIcon>
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;
