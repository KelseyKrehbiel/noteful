import React,{useContext} from 'react';
import config from './config';
import noteContext from './noteContext';
/*
delete button for notes
Implement the delete button for each note in the list in the main route and folder route.
Implement the delete button on the note page, if the delete is successful, redirect to the / path.

To delete notes, make a DELETE request to the /notes/<note-id> 

fetch(`http://localhost:1234/foo/${fooId}`, {
  method: 'DELETE',
  headers: {
    'content-type': 'application/json'
  },
})
*/

export default function DeleteButton (props) {
  const contextFunction = useContext(noteContext).handleUpdateList;


  const handleDeleteNote = (noteID) => {
    //when delete button clicked delete note
    console.log(`Deleting ${noteID}`)

    fetch(`${config.API_ENDPOINT}/notes/${noteID}`,{
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(()=>contextFunction(noteID)
    )
    //update state
    //use updateDB function in context from App.js
    

  }



  
  return(
    <button type="button"
    onClick={(event) => {
      event.preventDefault();
      handleDeleteNote(props.noteId
    )}}
    >Delete
    </button>
  )
  
}