import React, { useContext } from "react";
//import {NoteStore} from './dummy-store'
import FolderList from "./FolderList";
import { Link } from "react-router-dom";
import noteContext from "./noteContext";
import DeleteButton from "./DeleteButton";

//display list of notes and folders

export default function NoteListPage() {
  const notes = useContext(noteContext).state.notes;
  //console.log(notes);
  return (
    <article className="noteArticle">
      <div className="listContainer">
        <FolderList />

        <ul className="noteList">
          {notes.map((note) => (
            <li key={note.id} className="noteItem">
              <Link to={`/note/${note.id}`}>
                <h3>{note.name}</h3>
                <p>{note.modified}</p>
                <DeleteButton noteId={note.id} />
              </Link>
            </li>
          ))}
          <li>
            <Link to={"/addnote"}>Add Note</Link>
          </li>
        </ul>
      </div>
    </article>
  );
}

/*
The note-id will reference an id of one of the notes in state
The main section should display the currently selected notes name, modified date and content
The sidebar should display the folder of the currently selected note as well as a "back" button.
*/
