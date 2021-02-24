import React,{useContext} from 'react'
//import {NoteStore} from './dummy-store';
import {Link} from 'react-router-dom';
import FolderList from './FolderList';
import noteContext from './noteContext';

//display list of folders on left side of page
//contents of folder in center of page

export default function FolderView(props){
  //display folder name on left side
  //display list of notes that belong to folder
  //need a button to go back to list
  const folderNotes = useContext(noteContext).notes.filter((note)=>note.folderId === props.match.params.folderId);
  console.log(folderNotes);
 
  return(
    <div className="listContainer">
      
      <div className="folderList">
        <FolderList/>
      </div>
      <ul className="noteList">
          {folderNotes.map(
            note => 
            <li key={note.id}>
              <Link to={`/note/${note.id}`}>
                <h3>{note.name}</h3>
                <p>{note.modified}</p>
              </Link>
            </li>
          )}
      </ul>
    </div>
  )
}

/*
The folder-id will reference an id of one of the folders in state
The main section should display only the notes that are "in" the selected folder
The sidebar should display the folder list with the selected folder highlighted
*/