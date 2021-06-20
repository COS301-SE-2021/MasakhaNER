import React from 'react'
import {Create, SimpleForm, TextInput, PasswordInput} from "react-admin"

const  CreateUser = (props:any) =>{
    return (
        <Create title = "Create a user" {...props}>
            <SimpleForm>
                <TextInput disabled source = "id"/>
                <TextInput source = "firstname"/>
                <TextInput source = "lastname"/>
                <TextInput source = "email"/>
                <PasswordInput source = "password"/>
                <TextInput label = "Admin" source = "isadmin"/>
            </SimpleForm>
        </Create>
    )
}
export default CreateUser