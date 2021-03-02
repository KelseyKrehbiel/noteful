import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
//import {NoteStore} from './dummy-store'
import noteContext from './noteContext';

export default function FolderList(props){
  const folderList = useContext(noteContext).state.folders;
  
  return(
    <ul className="folderList">
      {folderList.map(
        folder => 
          <li key={folder.id} className="folderItem">
            <Link to={`/folder/${folder.id}`}>
            <p>{folder.name}</p>
            </Link>
          </li>
        )
      }
    
    </ul>
  )
}