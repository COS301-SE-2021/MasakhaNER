import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteButton,
  BooleanField,
} from "react-admin";

const UserList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="firstname" />
        <TextField source="lastname" />
        <EmailField source="email" />
        <BooleanField label="Admin" source="isadmin" />
        <BooleanField source="verified" />
        <EditButton basePath="/users" />
        <DeleteButton basePath="/users" />
      </Datagrid>
    </List>
  );
};

export default UserList;
