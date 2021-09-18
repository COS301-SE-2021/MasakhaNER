import { Edit, SimpleForm, TextInput } from "react-admin";

const UserEdit = (props) => {
  return (
    <Edit title="Edit User" {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="firstname" />
        <TextInput source="lastname" />
        <TextInput source="email" />
        <TextInput label="Admin" source="isadmin" />
        <TextInput source="verified" />
      </SimpleForm>
    </Edit>
  );
};
export default UserEdit;
