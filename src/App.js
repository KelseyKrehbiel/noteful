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

  render() {
    return (
      <noteContext.Provider
       value={{state: this.state,
                handleUpdateList: this.handleDeleteNote}}
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