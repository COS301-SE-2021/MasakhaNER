import React from 'react'
import { Edit, SimpleForm, TextInput } from "react-admin";
import { useHistory } from 'react-router-dom';
let history;

const back = () => {
    history.push("/models");
}

const ModelEdit = (props: any) => {
    history = useHistory();
    return (
    <Edit title="Change Model" {...props}>
      <h1 onClick = {back} >Model Changed</h1>
    </Edit>
    )
}

export default ModelEdit