import React from "react";

import "./TableLine.scss";

export const TableLine = (props,i) => {

  return (
    <tr>
      <th scope="row">{i}</th>
      <td>{props.id}</td>
      <td>{props.name}</td>
    </tr>
  );
};
