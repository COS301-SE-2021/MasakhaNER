import React from 'react'
import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
  } from "react-admin";
const  FeedBackList = (props: any) => {
    return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="feedback" />
        <EditButton  basePath="/feedback"/>
        <DeleteButton basePath="/feedback" />
      </Datagrid>
    </List>
    )
}

export default FeedBackList;
