import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";

const userList = (props: any) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <EditButton basePath="/" />
        <DeleteButton basePath="/" />
      </Datagrid>
    </List>
  );
};

export default userList;
