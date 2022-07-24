import React from 'react'
import './header.css'

const Header = ({setSearch, search, handleToggle, dark}) => {
  console.log(search);
  return (
    <header>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h1 className='header-h1' style={{color: dark ? 'white' : 'black'}}><span>React</span> Notes</h1>
          <button className='btn' onClick={handleToggle}>Toggle Mode</button>
        </div>
        <div className='input-div'>
            <input type='text' placeholder='Search for your notes' value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
    </header>
  )
}

export default Header