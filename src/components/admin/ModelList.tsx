import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

const ModelList = (props: any) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="modelname" />
        <TextField source="model" />
        <DeleteButton basePath="/models" />
        <EditButton basePath="/models" />
      </Datagrid>
    </List>
  );
};

export default ModelList;
