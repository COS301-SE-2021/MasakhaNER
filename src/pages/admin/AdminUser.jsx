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
import authProvider from "../../components/admin/authProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import Login from "../../components/login/Login";

export default function AdminUser() {
  const fetchJson = (url, options = {}) => {
    if (!options.headers) {
      options.headers = new Headers({ Accept: "application/json" });
    }
    options.headers.set("x-access-token", localStorage.getItem("token"));
    return fetchUtils.fetchJson(url, options);
  };
  const theme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#388e3c",
      },
      secondary: {
        main: "#1c5f22",
        contrastText: "#000000",
      },
    },
  });
  const dataProvider = simpleRestProvider(
    "https://masakha-api.herokuapp.com",
    fetchJson,
    "X-Total-Count"
  );
  return (
    <>
      <Admin
        theme={theme}
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={Login}
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
        <Resource name="dashboard" list={Input} />
      </Admin>
    </>
  );
}
