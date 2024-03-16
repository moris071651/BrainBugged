import './NavBar.css'

import { Link } from 'react-router-dom'


import 'bootstrap/dist/css/bootstrap.min.css'

const NavBar = () =>  {
  return (
    <div className="NavBar">
      <div>
        <Link className="navbar-brand" to="/landing">
          (CO)do
        </Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link Inter" to="/projects">All projects</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link Inter" to="/profile">Your account</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar

