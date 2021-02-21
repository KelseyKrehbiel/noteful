import React from 'react'
import { Link } from 'react-router-dom';
import {NoteStore} from './dummy-store'

export default function FolderList(props){
  const folderList = NoteStore.folders;
  
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