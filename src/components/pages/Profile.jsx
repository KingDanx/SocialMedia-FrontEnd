import React, { useState, useEffect } from "react";
import "./Profile.css";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import PendingFriendMapper from "../PendingFriendMapper";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Post from "../Post";
import AboutMe from "../AboutMe";
import ProfilePhoto from "../ProfilePhoto";
import FriendsMapper from "../FriendMapper";

const Profile = ({
  getFriends,
  getAProfile,
  user,
  setUser,
  profile,
  setProfile,
  setRequest,
  request,
  render,
  allUsers,
  getAllUsers,
}) => {
  const [value, setValue] = React.useState("1");
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    
  }, [profile._id]);

  return (
    <div>
      <div className="profile-page-grid">
        <div className='post-text'>
          <ProfilePhoto profile={profile} user={user}/>
          <p></p>
          <AboutMe render={render} profile={profile} user={user} setUser={setUser} />
        </div>

        <div>
          <Post profile={profile} setProfile={setProfile} user={user} render={render} setUser={setUser} allUsers={allUsers}/>
        </div>
        <div>
          <div className="tabs">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      label={
                        <div onClick={()=>setProfile(user)} className={"icon-tab-style"}>
                          <HomeIcon fontSize="large" />
                          <div className="text-tab-style">
                            <b>Home</b>
                          </div>
                        </div>
                      }
                      value="1"
                    />
                    <Tab
                      label={
                        <div className={"icon-tab-style"}>
                          <PeopleIcon fontSize="large" />
                          <div className="text-tab-style">
                            <b>Friends</b>
                          </div>
                        </div>
                      }
                      value="2"
                    />
                    <Tab
                      label={
                        <div className={"icon-tab-style"}>
                          <NotificationsIcon fontSize="large" />
                          <div className="text-tab-style notifiactions-image-text">
                            <b>Notifications</b>
                          </div>
                        </div>
                      }
                      value="3"
                    />
                  </TabList>
                </Box>
                <TabPanel value="2">
                  <FriendsMapper user={user} allUsers={allUsers} setProfile={setProfile}/>
                </TabPanel>
                <TabPanel value="3"><PendingFriendMapper getAllUsers={getAllUsers} getAProfile={getAProfile} setRequest={setRequest} user={user} request={request} allUsers={allUsers} setProfile={setProfile}/></TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
