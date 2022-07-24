import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import { nanoid } from 'nanoid'
import './app.css'
import Note from './components/Note'

const App = () => {
    const [note, setNote] = useState([
        {
            id: nanoid(),
            text: 'My first note',
            date: `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`
        }
    ])
    const [textarea, setTextarea] = useState('')
    const [search, setSearch] = useState('')

    useEffect(()=>{
        const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))
        if(savedNotes){
          setNote(savedNotes)
        }
      },[])

      useEffect(()=>{
        localStorage.setItem('react-notes-app-data',JSON.stringify(note))
      },[note])
    
    const handleSave = () => {
        setNote(prev => {
            let date = new Date()

            let newNote = {
                id: nanoid(),
                text: textarea,
                date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
            }
            return [
                ...prev,
                newNote
            ]
        })
        setTextarea('')
    }
    const handleDelete = (id) => {
        setNote(prev => {
            return prev.filter(obj => obj.id !== id)
        })
    }

  return (
    <div className='wrapper'>
        <Header setSearch={setSearch} search={search}/>
        <div className='notes-wrapper'>
            {note.filter(item => {
                if(search === '') {
                    return item
                }else if(item.text.toLowerCase().includes(search.toLowerCase())) {
                    return item
                }
            }).map(item => {
                return <Note item={item} key={item.id} handleDelete={handleDelete} search={search}/>
            })}
            <div className='note-input'>
                <textarea cols="10" rows="8" maxLength='300' value={textarea} onChange={e => setTextarea(e.target.value)} placeholder="Type to add a new note..."></textarea>
                <div className='root-inp'>
                    <span className='remaining'>{300 - textarea.length} Remaining</span>
                    <button className='save' onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App