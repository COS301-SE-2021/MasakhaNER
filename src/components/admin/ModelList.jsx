import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

const ModelList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="modelname" label="Name" />
        <TextField source="model" />
        <DeleteButton basePath="/models" />
        <EditButton label="Select Model" basePath="/models" />
      </Datagrid>
    </List>
  );
};

export default ModelList;
