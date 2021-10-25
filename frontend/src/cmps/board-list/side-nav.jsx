import { NavLink, Link } from 'react-router-dom';

export function SideNav() {
  return (
    <ul>
      <li >
        <NavLink to="/board" className="boards"><span>Boards</span></NavLink>
      </li>
      <li >
        <NavLink to="/templates" className="templates"><span>Templates</span></NavLink>
      </li>
      <li >
        <Link to="/" className="home"><span>Home</span></Link>
      </li>
      <hr />
    </ul>
  );
}
