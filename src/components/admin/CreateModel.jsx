import { Create, SimpleForm, TextInput } from "react-admin";

const CreateModel = (props) => {
  return (
    <Create title="Add a Model" {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="modelname" label="Name" />
        <TextInput source="model" />
      </SimpleForm>
    </Create>
  );
};
export default CreateModel;
