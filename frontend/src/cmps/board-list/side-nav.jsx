// import React from 'react';

import { NavLink } from 'react-router-dom';

export function SideNav() {
  return (
    <ul>
      <li className="boards">
        <NavLink to="/board">Boards</NavLink>
      </li>
      <li className="templates">
        <NavLink to="/templates">Templates</NavLink>
      </li>
      <li className="home">
        <NavLink to="/">Home</NavLink>
      </li>
      <hr />
    </ul>
  );
}
