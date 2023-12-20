import React from "react";
import "./TeamAvatar.scss"; 
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Remy from "../../assets/images/avatar/1.jpg";
import Travis from "../../assets/images/avatar/2.jpg";
import Cindy from "../../assets/images/avatar/3.jpg";
import Agnes from "../../assets/images/avatar/4.jpg";
import Trevor from "../../assets/images/avatar/5.jpg";

function TeamAvatar() {
  return (
    <Link className="avatarGrp">
      <AvatarGroup  max={3} >
        <Avatar alt="Remy Sharp" src={Remy} />
        <Avatar alt="Travis Howard" src={Travis}/>
        <Avatar alt="Cindy Baker" src={Cindy} />
        <Avatar alt="Agnes Walker" src={Agnes} />
        <Avatar alt="Trevor Henderson" src={Trevor} />
      </AvatarGroup>
    </Link>
  );
}

export default TeamAvatar;
