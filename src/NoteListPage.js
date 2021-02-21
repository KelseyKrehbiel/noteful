import React from 'react'
import {NoteStore} from './dummy-store'
import FolderList from "./FolderList";
import {Link} from 'react-router-dom';

//display list of notes and folders

export default function NoteListPage(props) {
/*   const note = NoteStore.find(p =>
    p.notes.id === props.match.params.noteId
  ) */
  const notes = NoteStore.notes;
  console.log(notes);
  return (
    <article className='noteArticle'>
      <h2>All Notes</h2>
      <div className="listContainer">
      <FolderList/>
     
      <ul className="noteList">
        {notes.map(
          note => 
          <li key={note.id} className="noteItem">
            <Link to={`/note/${note.id}`}>
              <h3>{note.name}</h3>
              <p>{note.modified}</p>
            </Link>
          </li>
        )}
  
      </ul>
      </div>
    </article>
  )
}

/*
The note-id will reference an id of one of the notes in state
The main section should display the currently selected notes name, modified date and content
The sidebar should display the folder of the currently selected note as well as a "back" button.
*/