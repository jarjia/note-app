import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import { nanoid } from 'nanoid'
import './app.css'
import Note from './components/Note'

const App = () => {
    const [note, setNote] = useState([])
    const [textarea, setTextarea] = useState('')
    const [title, setTitle] = useState('')
    const [search, setSearch] = useState('')
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        document.body.style.background = darkMode ? '#111111' : 'white'
        const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))
        if(savedNotes){
          setNote(savedNotes)
        }
    }, [darkMode])

    useEffect(()=>{
        localStorage.setItem('react-notes-app-data',JSON.stringify(note))
    },[note])

    const handleSave = () => {
        setNote(prev => {
            let date = new Date()

            let newNote = {
                id: nanoid(),
                title: title,
                text: textarea,
                date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
            }
            return [
                ...prev,
                newNote
            ]
        })
        setTextarea('')
        setTitle('')
    }
    const handleDelete = (id) => {
        setNote(prev => {
            return prev.filter(obj => obj.id !== id)
        })
    }

    const handleToggle = () => {
        setDarkMode(prev => !prev)
    }

  return (
    <div>
        <div className='wrapper'>
            <Header setSearch={setSearch} search={search} handleToggle={handleToggle} dark={darkMode}/>
            <div className='notes-wrapper'>
                {note.filter(item => {
                    if(search === '') {
                        return item
                    }else if(item.title.toLowerCase().includes(search.toLowerCase())) {
                        return item
                    }else {
                        return null
                    }
                }).map(item => {
                    return <Note item={item} key={item.id} handleDelete={handleDelete} search={search}/>
                })}
                <div className='note-input'>
                    <input type='text' className='inp-title' maxLength='26' placeholder='Type your title...' value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
                    <textarea cols="10" rows="8" maxLength='300' value={textarea} onChange={e => setTextarea(e.target.value)} placeholder="Type to add a new note..."></textarea>
                    <div className='root-inp'>
                        <span className='remaining'>{300 - textarea.length} Remaining</span>
                        <button className='save' onClick={((textarea.match(/[a-zA-Z0-9!@#$%^&*)(+=._-]/) === null) || (title.match(/[a-zA-Z0-9!@#$%^&*)(+=._-]/) === null)) ? undefined : handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App