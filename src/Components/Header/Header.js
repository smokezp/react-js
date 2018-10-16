import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css';

const Header = () => (
    <header>
      <nav>
        <ul>
          <li className="route-links"><Link to='/products'>Products</Link></li>
          <li className="route-links"><Link to='/game'>Game</Link></li>
          <li className="route-links"><Link to='/login'>Login</Link></li>
          <li className="route-links"><Link to='/register'>Register</Link></li>
          <li className="route-links"><Link to='/sudoku'>Sudoku</Link></li>
        </ul>
      </nav>
    </header>
);

export default Header
