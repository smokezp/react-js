import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css';

const Header = () => (
    <header>
      <nav>
        <ul>
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/game'>Game</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/register'>Register</Link></li>
        </ul>
      </nav>
    </header>
);

export default Header
