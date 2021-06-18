import React from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";

import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";
import userList from "../../components/admin/userList";
import CreateUser from "../../components/admin/CreateUser";
import UserEdit from "../../components/admin/UserEdit";
import { Input } from "../../components/input/Input";

export default function admin() {
  return (
      <Admin dataProvider={restProvider("http://localhost:3000")}>
        <Resource 
          name="users" 
          list={userList} 
          create = {CreateUser} 
          edit = {UserEdit}
        />
        <Resource name="dashboard" list={Input} />
      </Admin>
  );
}
