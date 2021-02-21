import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListPage from './NoteListPage';
import FolderView from './FolderView';
import NotePage from './NotePage';
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
    //when the component mounts get the folder and note data
    componentDidMount(){
      this.getNotes();
      this.getFolders();
      console.log(`note state is ${this.state.notes}`);
    }


    getNotes(){
      const noteData = NoteStore.notes
      this.setState({
        notes: noteData
      })
    }
    getFolders(){
      const folderData = NoteStore.folders
      this.setState({
        folders: folderData
      })
    }
  
    


  render() {
    return (
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
    );
  }
}

export default App;