import React from 'react'
import {Link} from 'react-router-dom'
import DummyStore from './dummy-store'

export default function FolderPage(props){
  return(
    <ul>
      folders
    </ul>
  )
}

/*
The folder-id will reference an id of one of the folders in state
The main section should display only the notes that are "in" the selected folder
The sidebar should display the folder list with the selected folder highlighted
*/