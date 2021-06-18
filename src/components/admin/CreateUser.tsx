import React from 'react'
import {Create, SimpleForm, TextInput} from "react-admin"

const  CreateUser = (props:any) =>{
    return (
        <Create title = "Create a user" {...props}>
            <SimpleForm>
                <TextInput source = "firstname"/>
                <TextInput source = "lastname"/>
                <TextInput source = "email"/>
                <TextInput label = "Admin" source = "isadmin"/>
            </SimpleForm>
        </Create>
    )
}
export default CreateUser