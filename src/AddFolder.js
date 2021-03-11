/*
 implements a form to capture the name of a new folder from the user. 
 This form should submit the name of the new folder to the POST /folders endpoint on the server. 
 Ensure that any errors are properly handled. Add a button to the navigation to invoke the new form.
*/
import React, { useContext } from 'react';
import config from './config';
import noteContext from './noteContext';


export default function AddFolder(props){
  //do stuff
  const handleAddFolder = useContext(noteContext).handleAddFolder;
  const handleSubmit = (e) =>{
    e.preventDefault();
    const folderName = e.target.folderName.value;
    console.log('Folder Name: ', folderName);
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
      console.log("Added folder to database", data);
      const folderData = {id: data.id,
                          name: data.name}
      handleAddFolder(folderData);      
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    
  }

  return(
    <div>
      <form className="FolderName" onSubmit={e => handleSubmit(e)}>
        <label htmlFor="folderName">Folder Name</label>
        <input type="text" className="textInput"
        name="folderNamw" id="folderName"/>
        <button type="submit" className="formButtton">
          Add
        </button>
      </form>
    </div>
  )
}