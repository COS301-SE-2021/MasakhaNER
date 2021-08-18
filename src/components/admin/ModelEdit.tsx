import React from 'react'
import { Edit, SimpleForm, TextInput } from "react-admin";

 const ModelEdit = (props: any) => {
    return (
      <Edit title="Change Model" {...props}>
          <h1>Model Selected!</h1>
    </Edit>
    )
}

export default ModelEdit