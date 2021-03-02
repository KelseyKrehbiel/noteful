import React,{useContext} from 'react'
import noteContext from './noteContext';
import DeleteButton from './DeleteButton';

//Display selected note

export default function NotePage(props){
  const noteId = props.match.params.noteId;
  console.log(noteId);

  //get note and folder data from context
  const serverData = useContext(noteContext)

  const noteData = serverData.state.notes.find(n =>
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
  const folderData = serverData.state.folders.find(folder =>
  folder.id === noteData.folderId
)

  return(
    <div className="listContainer">

      <div className="folderList">
        {folderData.name}
      </div>
      <div className="noteContent">
        <span className="NoteHeader">
          <h1>{noteData.name}</h1>
          <p>{noteData.modified}</p>
          <DeleteButton noteId={noteId}/>
        </span>
        <p>
          {noteData.content}
        </p>
        
      </div>
    </div>
  )
  

}