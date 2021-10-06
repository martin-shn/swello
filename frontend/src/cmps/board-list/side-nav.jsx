// import React from 'react';

<<<<<<< HEAD
import { NavLink } from 'react-router-dom';
=======
import { NavLink, Link } from 'react-router-dom';
>>>>>>> 52000a239b60f052547c14e299eccc63060d03f6

export function SideNav() {
  return (
    <ul>
<<<<<<< HEAD
      <li className="boards">
        <NavLink to="/board">Boards</NavLink>
      </li>
      <li className="templates">
        <NavLink to="/templates">Templates</NavLink>
      </li>
      <li className="home">
        <NavLink to="/">Home</NavLink>
=======
      <li >
        <NavLink to="/board" className="boards"><span>Boards</span></NavLink>
      </li>
      <li >
        <NavLink to="/templates" className="templates"><span>Templates</span></NavLink>
      </li>
      <li >
        <Link to="/" className="home"><span>Home</span></Link>
>>>>>>> 52000a239b60f052547c14e299eccc63060d03f6
      </li>
      <hr />
    </ul>
  );
}
