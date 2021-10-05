// import React from 'react';

import { Link } from 'react-router-dom';

export function SideNav() {
  return (
    <ul>
      <li className="boards active">
        <Link to="/board">Boards</Link>
      </li>
      <li className="templates">
        <Link to="/templates">Templates</Link>
      </li>
      <li className="home">
        <Link to="/">Home</Link>
      </li>
      <hr />
    </ul>
  );
}
