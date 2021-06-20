import React from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";

import {fetchUtils, Admin, Resource } from "react-admin";
import userList from "../../components/admin/UserList";
import CreateUser from "../../components/admin/CreateUser";
import UserEdit from "../../components/admin/UserEdit";
import { Input } from "../../components/input/Input";
import simpleRestProvider from 'ra-data-simple-rest';
import axios from "axios";

export default function AdminUser() {
  
  return (
      <Admin dataProvider={simpleRestProvider("http://localhost:3000")}>
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
