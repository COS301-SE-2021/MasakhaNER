import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteButton,
} from "react-admin";

const UserList = (props: any) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="firstname" />
        <TextField source="lastname" />
        <EmailField source="email" />
        <TextField source="isadmin" />
        <TextField source="verified" />
        <DeleteButton basePath="/user" />
        <EditButton basePath="/user" />
      </Datagrid>
    </List>
  );
};

export default UserList;
