import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <Home />
      </Link>
      <Link to="/newpost">
        <Add />
      </Link>
      <Link to="/search">
        <Search />
      </Link>
      <Link to="/account">
        <AccountCircle />
      </Link>
    </div>
  );
};

export default Header;
