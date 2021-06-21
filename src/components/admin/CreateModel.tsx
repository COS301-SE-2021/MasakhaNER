import React from 'react'
import {Create, SimpleForm, TextInput} from "react-admin"

const  CreateModel = (props:any) =>{
    return (
        <Create title = "Create a user" {...props}>
            <SimpleForm>
                <TextInput source = "modelname"/>
                <TextInput source = "model"/>
            </SimpleForm>
        </Create>
    )
}
export default CreateModel