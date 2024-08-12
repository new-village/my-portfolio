import React from 'react'
import { Link } from 'react-router-dom'
import Icon from "../images/icon.png";

const Header = () => {
  return (
    <aside>
        <div className='logo'>
          <img src={Icon} />
          <p>My Portfolio</p>
        </div>

        <nav>
            <ul>
                <Link to='/'><li>ホーム</li></Link>
                <Link to='/corporate'><li>法人リスト</li></Link> 
            </ul>
        </nav>
    </aside>
  )
}

export default Header