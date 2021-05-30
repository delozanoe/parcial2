import React, { useEffect, useState } from "react";
import "./HomeDetail.scss";
import { CardRoom } from "../../components/card-room/CardRoom";
import { PieChart } from "../../components/pie-chart/PieChart";
import { getHomeById } from "../../services/utils";
import { FormattedMessage } from "react-intl";
 
export const HomeDetail = () => {
  var pathArray = window.location.pathname.split("/");
  let id = pathArray[2];
  const [home, setHome] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [devices, setDecives] = useState([]);
  const j =1;
  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("home"+id) === null) {
        this.setState({
          home: null,
          rooms:null,
          devices:null
        });
      } else {
        this.setState({
          homes: localStorage.getItem("home"+id),
          rooms: localStorage.getItem("rooms"+id),
          devices: localStorage.getItem("devices"+id)
        });
      }
    }
    getHomeById(id).then((data) => {

      setHome(data);
      setRooms(data["rooms"]);
      setDecives(data["rooms"][0]["devices"]);
      //Data into local Stoage
      localStorage.setItem("home"+id, JSON.stringify(data));
      localStorage.setItem("rooms"+id, JSON.stringify(data["rooms"]));
      localStorage.setItem("devices"+id, JSON.stringify(data["rooms"][0]["devices"]));
    });
  }, [id]);
  //Usea efect para masestro detalle

  return (
    <div>
      <h1><FormattedMessage id="myRooms" /></h1>
      <div className="row">
        <div className="col card-continer">
          {rooms &&
            rooms.map((home, i) => (
              <div className="card card-home">
                <div className="card-home-body">
                  <div className="card-home-body-description">
                    <h5 className="card-home-title">{home.name}</h5>
                  </div>
                </div>
                <p onClick={() => setDecives(home["devices"])}>
                  {home.type === "room" ? (
                    <img
                      src="/living-room.png"
                      className="card-home-room-img-top"
                      alt="Icon Living Room"
                    />
                  ) : (
                    <img
                      src="/kitchen.png"
                      className="card-home-room-img-top loft"
                      alt="Icon Kitchen"
                    />
                  )}
                </p>
              </div>
            ))}
        </div>
        <div className="col-5">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col"><FormattedMessage id="device" /></th>
                <th scope="col"><FormattedMessage id="value" /></th>
              </tr>
            </thead>
            <tbody>
              {devices &&
                devices.map((device, i) => (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{device.id}</td>
                    <td>{device.name}</td>
                    <td>{device["desired"].value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div>
            
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2><FormattedMessage id="stats" /></h2>
          <h4><FormattedMessage id="statsTitle" /></h4>
        <PieChart props={rooms} kew={j}></PieChart>
        </div>
      </div>
    </div>
  );
};
