import React from 'react'
import {NoteStore} from './dummy-store';
import FolderList from './FolderList';

//Display selected note

export default function NotePage(props){
  const noteId = props.match.params.noteId;
  console.log(noteId);

  const noteData = NoteStore.notes.find(n =>
    n.id === noteId
  )
  if(!noteData){
    //error
    console.log("note not found");
    return(
      <div>
             page not found
      </div>
 
    )
  }
  
  const folderData = NoteStore.folders.find(folder =>
  folder.id === noteData.folderId
)

  return(
    <div>

      <div className="folderNav">
        {folderData.name}
      </div>
      <p>
        <h1>{noteData.name}</h1>
        <p>{noteData.modified}</p>
        {noteData.content}
      </p>
    </div>
  )
  

}