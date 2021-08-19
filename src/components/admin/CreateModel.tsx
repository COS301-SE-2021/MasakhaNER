import React from 'react'
import {Create, SimpleForm, TextInput} from "react-admin"

const  CreateModel = (props:any) =>{
    return (
        <Create title = "Add a Model" {...props}>
            <SimpleForm>
                <TextInput disabled source = "id"/>
                <TextInput source = "modelname" label ='Name'/>
                <TextInput source = "model"/>
            </SimpleForm>
        </Create>
    )
}
export default CreateModel