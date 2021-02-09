import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListPage from './NoteListPage';
import FolderView from './FolderView';
import NotePage from './NotePage';

  class App extends Component {
/*
  function Example() {
  return <>
    <Sidebar>
      <Route path='/' component={MainSidebar} />
      <Route path='/foo' component={FooSidebar} />
    </Sidebar>
    <Main>
      <Route path='/' component={MainMain} />
      <Route path='/foo' component={FooMain} />
    </Main>
  </>
}
*/
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