import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import axios from "axios";
import "./styles/Post.css";
import trollFace from "../images/troll-face.jpg";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./styles/Post.css";
import "./styles/PostMapper.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const PostMapper = ({ user, render, allUsers, setProfile }) => {
  let friendPostArray = allUsers.filter((friend) =>
    user.friendsList.includes(friend._id)
  );
  console.log(friendPostArray);

  let postObjectArray = [];

  if (user.posts !== []) {
    user.posts.map((el) => {
      postObjectArray.push({
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        _id: user._id,
        post: el.body,
        likes: el.likes,
        dateModified: el.dateModified,
      });
    });
  }


  friendPostArray.map((el) => {
    el.posts.map((post) => {
      postObjectArray.push({
        firstName: el.firstName,
        lastName: el.lastName,
        image: el.image,
        _id: el._id,
        post: post.body,
        likes: post.likes,
        dateModified: post.dateModified,
      });
    });
  });

  console.log(postObjectArray);

  let sortByDateArray = postObjectArray.sort(function (a, b) {
    return new Date(a.dateModified) - new Date(b.dateModified);
  });

  console.log(sortByDateArray);

  const addLike = async (post) => {
    await axios
      .put(
        `http://localhost:5000/api/users/${user._id}/posts/${post._id}`,
        {
          body: post.body,
          likes: post.likes + 1,
          disLikes: post.disLikes,
        },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        console.log(post);
      });
  };

  return (
    <div className="post-mapper-all">
      <div>
        {sortByDateArray
          .slice(0)
          .reverse()
          .map((friend, index) => (
            <div className="card" key={index}>
              <Card sx={{ maxWidth: 400 }}>
                <div className="style-post-name">{friend.firstName} {friend.lastName}</div><DeleteForeverIcon className="
.style-trashcan"/>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="80"
                  image={
                    !friend.image
                      ? trollFace
                      : `http://localhost:5000/${friend.image}`
                  }
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {friend.post}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {friend.body}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => addLike(friend)} size="small">
                    {" "}
                    <FavoriteIcon />
                    {friend.likes}
                  </Button>
                  <div className="date-margin">
                    <b>
                      {friend.dateModified
                        .slice(0, -8)
                        .replace("T", " ")
                        .replace("Z", "")}
                    </b>
                  </div>
                </CardActions>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostMapper;
