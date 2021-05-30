import React, { useEffect, useState } from "react";
import "./HomesList.scss";
import { Card } from "../../components/card/Card";
import { getHomes } from "../../services/utils";
import { FormattedMessage } from "react-intl";

export const HomesList = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("homes") === null) {
        this.setState({
          homes: null,
        });
      } else {
        this.setState({
          homes: localStorage.getItem("homes"),
        });
      }
    }
    getHomes().then((data) => {
      setHomes(data);
      localStorage.setItem("homes", JSON.stringify(data));
    });
  }, []);

  return (
    <div className="container home">
      <h1>
        <FormattedMessage id="spaces" />
      </h1>
      <div className="card-continer">
        {homes && homes.map((home, i) => <Card props={home} key={i}></Card>)}
      </div>
    </div>
  );
};
