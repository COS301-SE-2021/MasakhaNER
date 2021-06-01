import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTimes } from 'react-icons/fa';
import './InputSection.css'

export default function InputSection() {
    return (
        <div className = 'inputSection'>
            <textarea placeholder = 'Enter Text' id = 'testSection'></textarea>
            <div className = "inputButton">
                <button className = 'btn btn-primary'>Translate</button>
                <button  className = 'btn btn-light'><FaTimes /></button>
            </div>
        </div>
    )
}
