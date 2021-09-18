import { fetchUtils, Admin, Resource } from "react-admin";
import UserList from "../../components/admin/userList";
import CreateUser from "../../components/admin/CreateUser";
import UserEdit from "../../components/admin/UserEdit";
import { Input } from "../../components/input/Input";
import simpleRestProvider from "ra-data-simple-rest";
import CreateModel from "../../components/admin/CreateModel";
import ModelList from "../../components/admin/ModelList";
import FeedBackList from "../../components/admin/FeedBackList";
import ModelEdit from "../../components/admin/ModelEdit";
import { createMuiTheme } from "@material-ui/core/styles";
import Login from "../../components/login/Login";
import { purple } from "@material-ui/core/colors";
import Logout from "../../components/logout/Logout";
import Dashboard from "../dashboard/Dashboard";

export default function AdminUser() {
  const fetchJson = (url: string, options: any = {}) => {
    if (!options.headers) {
      options.headers = new Headers({ Accept: "application/json" });
    }
    options.headers.set("x-access-token", localStorage.getItem("token"));
    return fetchUtils.fetchJson(url, options);
  };
  const theme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#388e3c',
      },
      secondary: {
        main: '#1c5f22',
        contrastText: '#000000',
      },
    },
  });
  const dataProvider = simpleRestProvider("http://localhost:3000", fetchJson);
  return (
    <>
      <Admin
        theme={theme}
        dataProvider={dataProvider}
        loginPage = {Login}
        logoutButton = {Logout}
      >
        <Resource
          name="users"
          list={UserList}
          edit={UserEdit}
          create={CreateUser}
        />
        <Resource
          name="models"
          edit={ModelEdit}
          list={ModelList}
          create={CreateModel}
        />
        <Resource name="feedback" list={FeedBackList} />
        <Resource name="dashboard" list={Dashboard} />
      </Admin>
    </>
  );
}
