import React from "react";
import { Tyography } from "@material-ui/material";
import { Link } from "react-router-dom";
const User = ({ userId, name, avatar }) => {
  return (
    <Link to={`/user/${userId}`} className="homeUser">
      <img src={avatar} alt={name} />
      <Tyography>{name}</Tyography>
    </Link>
  );
};

export default User;
