import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListPage from './NoteListPage';
import FolderView from './FolderView';
import NotePage from './NotePage';
import config from './config';
import noteContext from './noteContext'
//import {NoteStore} from './dummy-store';

class App extends Component {
  constructor(props){
  super(props)
  //initialize the note state here
  this.state = {
      notes: [],
      folders: []
    }
  }

  fetchServerData = () =>{
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])//save note response to notesRes
      .then(([notesRes, foldersRes]) => {
          if (!notesRes.ok)
          //if not OK return the error
              return notesRes.json().then(e => Promise.reject(e));
          if (!foldersRes.ok)
              return foldersRes.json().then(e => Promise.reject(e));

          return Promise.all([notesRes.json(), foldersRes.json()]);
      })
        .then(([notes, folders]) => {
            this.setState({notes, folders});
            console.log(this.state.notes);
            console.log(this.state.folders);
        })
        .catch(error => {
            console.error({error});
        });


  }

  //when the component mounts get the folder and note data
  componentDidMount(){
    this.fetchServerData();
  }

  handleDeleteNote = (noteID) =>{
    const currentNotes = this.state.notes.filter((note) =>note.id!==noteID)
    this.setState({notes: currentNotes})
    console.log(this.state.notes)
  }

  handleAddFolder = (folderData) =>{
    //take in new folder name and id
    //add folder to state
    //console.log(`adding folder to state`,folderData);
    this.state.folders.push(folderData);
    const currentFolders = this.state.folders;
    //console.log("Current Folder", currentFolders);
    this.setState({folders: currentFolders});
    //console.log(this.state.folders);
  }

  handleAddNote = (noteData) =>{
    //take in note data
    //add note to state
    console.log("Adding note to state",noteData);
    this.state.notes.push(noteData);
    const currentNotes = this.state.notes;
    this.setState({notes: currentNotes})
  }

  render() {
    return (
      <noteContext.Provider
       value={{state: this.state,
                handleUpdateList: this.handleDeleteNote,
                handleAddFolder: this.handleAddFolder,
                handleAddNote: this.handleAddNote}}
       >
      <div className='App'>
        <nav>
          <Link to='/'>Note List</Link>
        </nav>
        <header>
          <h1>Noteful</h1>
        </header>
        <main>
          <Route
            exact path='/'
            component={NoteListPage}
          />
          <Route
            path='/folder/:folderId'
            component={FolderView}
          />
          <Route
            path='/note/:noteId'
            component={NotePage}
          />
        </main>
        <footer>
          <p>noteful. the page full of notes</p>
        </footer>
      </div>
      </noteContext.Provider>
    );
  }
}

export default App;