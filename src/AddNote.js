/*
implements a form to capture the name, content and folder for a new Note. 
Submit to the POST /notes endpoint on the server. 
Add validation to ensure that the name of the note is not left blank. 
The folder should be selected from a list of existing folders. 
Ensure that errors are properly handled. 
Add a button to the note list page to invoke this new form.
*/
import React, { useContext, useState } from "react";
import config from "./config";
import noteContext from "./noteContext";
import PropTypes from 'prop-types';

export default function AddNote(props) {
  //do stuff
  const handleAddNote = useContext(noteContext).handleAddNote;
  const [error, setError] = useState("");
  const folderList = useContext(noteContext).state.folders;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.noteName.value.trim(),
      content: e.target.noteContent.value.trim(),
      folderId: e.target.folderName.value,
      modified: new Date()
    };
    if (!formData.name) {
      return setError("Note name is required");
    }
    console.log("note data: ", formData);
    //add note to database
    POSTNote(formData);
  };

  const POSTNote = (formData) => {
    const noteJson = formData;
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(noteJson),
    })
      .then((noteResponse) => noteResponse.json())
      .then((data) => {

        //update state
        handleAddNote(data);
        console.log("Added note to database");
        props.history.push("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Error trying to create note");
      });
  };

  return (
    <div>
      <form className="noteName" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          className="textInput"
          name="noteName"
          id="noteName"
        />
        <label htmlFor="Content">Content</label>
        <input
          type="textarea"
          className="textInput"
          name="noteContent"
          id="noteContent"
        />

        <label htmlFor="Folder">Folder</label>
        <select className="textInput" name="folderName" id="folderName">
          {folderList.map((folder) => (
            <option key={folder.id} className="folderItem" value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <button type="submit" className="formButtton">
          Add
        </button>
      </form>
      <p>{error}</p>
    </div>
  );
}
AddNote.propTypes = {
  history: PropTypes.any
}