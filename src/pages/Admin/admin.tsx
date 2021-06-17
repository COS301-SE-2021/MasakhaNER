import React from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";

import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";
import userList from "../../components/admin/userList";
import { Input } from "../../components/input/Input";

export default function admin() {
  return (
    <>
      <Admin dataProvider={restProvider("/")}>
        <Resource name="users" list={userList} />
        <Resource name="dashboard" list={Input} />
      </Admin>
    </>
  );
}
