import React from 'react'
import './header.css'

const Header = ({setSearch, search}) => {
  console.log(search);
  return (
    <header>
        <h1 className='header-h1'><span>React</span> Notes</h1>
        <div className='input-div'>
            <input type='text' placeholder='Search for your notes' value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
    </header>
  )
}

export default Header