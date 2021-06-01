import React from 'react'
import InputSection from '../InputSection/InputSection'
import Top from '../top/Top'
import './Input.css'

export const Input = () => {
    return (
        <div className = 'input'>
           <div className ='container'>
                <Top />
                <InputSection />
                <div id = 'output'></div>
            </div> 
        </div>
    )
}
