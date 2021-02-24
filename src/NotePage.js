import React,{useContext} from 'react'
//import {NoteStore} from './dummy-store';
import noteContext from './noteContext';
//Display selected note

export default function NotePage(props){
  const noteId = props.match.params.noteId;
  console.log(noteId);

  //get note and folder data from context
  const serverData = useContext(noteContext)

  const noteData = serverData.notes.find(n =>
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
  //get get folder with id matching note
  const folderData = serverData.folders.find(folder =>
  folder.id === noteData.folderId
)

  return(
    <div className="listContainer">

      <div className="folderList">
        {folderData.name}
      </div>
      <p className="noteContent">
        <h1>{noteData.name}</h1>
        <p>{noteData.modified}</p>
        {noteData.content}
      </p>
    </div>
  )
  

}