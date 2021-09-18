import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  PasswordInput,
  NumberInput,
} from "react-admin";

const CreateUser = (props) => {
  return (
    <Create title="Create a user" {...props}>
      <SimpleForm>
        <NumberInput disabled source="id" />
        <TextInput source="firstname" />
        <TextInput source="lastname" />
        <TextInput source="email" />
        <PasswordInput source="password" />
        <TextInput label="Admin" source="isadmin" />
      </SimpleForm>
    </Create>
  );
};
export default CreateUser;
