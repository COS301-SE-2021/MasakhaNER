import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteButton,
} from "react-admin";
import { format, parse } from "content-range";
import { useEffect } from "react";

const UserList = (props: any) => {
  // const options: any = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "x-access-token": localStorage.getItem("token"),
  //   },
  // };

  // useEffect(() => {
  //   fetch("/users", options)
  //     .then((res) => {
  //       res.json();
  //     })
  //     .then((data) => { 
  //       console.log(typeof(data));
  //     })
  //     // .catch((err) => console.log(err));
  // }, [true]);

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
