import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";
const FeedBackList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="feedback" />
        <DeleteButton basePath="/feedback" />
      </Datagrid>
    </List>
  );
};

export default FeedBackList;
