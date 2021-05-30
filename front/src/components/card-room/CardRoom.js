import React from "react";
import "./CardRoom.scss";

export const CardRoom = (props) => {
  props = props["props"];
  return (
    
    <div className="card card-home">
        <div className="card-home-body">
        <div className="card-home-body-description">
          <h5 className="card-home-title">{props.name}</h5>
        </div>
      </div>
      <p onClick="table()">
        {props.type === "room" ? (
          <img src="/living-room.png" className="card-home-room-img-top" alt="Icon Living Room" />
        ) : (
          <img
            src="/kitchen.png"
            className="card-home-room-img-top loft"
            alt="Icon Kitchen"
          />
        )}
      </p>
    </div>
  );
};