import './NavBar.css'

import { Link } from 'react-router-dom'


import 'bootstrap/dist/css/bootstrap.min.css'

const NavBar = () =>  {
  return (
    <div className="NavBar">
      <div>
        <Link class="navbar-brand" href="#">
          (CO)do
        </Link>
      </div>
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link className="nav-link">About</Link>
        </li>
        <li class="nav-item">
          <Link className="nav-link">Your todays theme</Link>
        </li>
        <li class="nav-item">
          <Link className="nav-link">Your account</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar

