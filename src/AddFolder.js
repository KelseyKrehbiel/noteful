/*
 implements a form to capture the name of a new folder from the user. 
 This form should submit the name of the new folder to the POST /folders endpoint on the server. 
 Ensure that any errors are properly handled. Add a button to the navigation to invoke the new form.
*/
import React, { useContext,useState } from 'react';
import config from './config';
import noteContext from './noteContext';


export default function AddFolder(props){
  //do stuff
  const handleAddFolder = useContext(noteContext).handleAddFolder;
  const [error,setError] = useState("");
  const handleSubmit = (e) =>{
    e.preventDefault();
    const folderName = e.target.folderName.value.trim();
    if(!folderName){
      return setError("Folder name is required")
    }
    //console.log('Folder Name: ', folderName);
    POSTFolder(folderName)
    //add folder to state
  }

  const POSTFolder = (folderName) =>{
    const folderJson = {name: folderName};
    
    fetch(`${config.API_ENDPOINT}/folders`,{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folderJson)
    })
    .then((folderResponse) => folderResponse.json())
    .then(data => {
      //console.log("Added folder to database", data);
      const folderData = {id: data.id,
                          name: data.name}
      handleAddFolder(folderData);
      props.history.push('/')      
    })
    .catch((error) => {
      console.error('Error:', error);
      setError("Error trying to create folder")
    })
    
  }

  return(
    <div>
      <form className="folderName" onSubmit={e => handleSubmit(e)}>
        <label htmlFor="folderName">Folder Name</label>
        <input type="text" className="textInput" 
        name="folderName" id="folderName" required/>
        <button type="submit" className="formButton">
          Add
        </button>
        <p>
          {error}
        </p>
      </form>
    </div>
  )
}