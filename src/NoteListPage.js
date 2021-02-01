import React from 'react'
import {Link} from 'react-router-dom'
import {NoteStore} from './dummy-store'

export default function NotePage(props) {
  const note = NoteStore.find(p =>
    p.id === props.match.params.noteId
  )
  return (
    <article className='note'>
      <h2>{note.title}</h2>
      {note.content.map((p, i) =>
        (p === '')
          ? <br key={i} />
          : <p key={i}>{p}</p>
      )}
    </article>
  )
}

/*
The note-id will reference an id of one of the notes in state
The main section should display the currently selected notes name, modified date and content
The sidebar should display the folder of the currently selected note as well as a "back" button.
*/