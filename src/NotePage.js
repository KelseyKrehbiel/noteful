import React, { useContext } from "react";
import noteContext from "./noteContext";
import DeleteButton from "./DeleteButton";
import PropTypes, { string } from "prop-types";

//Display selected note

export default function NotePage(props) {
  const noteId = props.match.params.noteId;
  console.log(noteId);

  //get note and folder data from context
  const serverData = useContext(noteContext);

  const noteData = serverData.state.notes.find((n) => n.id === noteId);

  if (!noteData) {
    //error
    console.log("note not found");
    return <div>page not found</div>;
  }
  //get get folder with id matching note
  const folderData = serverData.state.folders.find(
    (folder) => folder.id === noteData.folderId
  );
  const cleanDate = new Date(noteData.modified);
  var options = { year: "numeric", month: "long", day: "numeric" };
  const USdate = new Intl.DateTimeFormat("en-US", options).format(cleanDate);

  return (
    <div className="listContainer">
      <div className="folderList">
        <button
          type="button"
          className="largeButton"
          onClick={(e) => {
            e.preventDefault();
            props.history.goBack();
          }}
        >
          Go Back
        </button>

        <h2>{folderData.name}</h2>
      </div>
      <div className="noteContent">
        <section className="noteHeader">
          <h2>{noteData.name}</h2>

          <div className="dateDelete">
            <p>Date modified on {USdate}</p>
            <DeleteButton noteId={noteId} history={props.history} />
          </div>
        </section>
        <p>{noteData.content}</p>
      </div>
    </div>
  );
}
NotePage.propTypes = {
  history: PropTypes.any,
  noteId: string,
};
