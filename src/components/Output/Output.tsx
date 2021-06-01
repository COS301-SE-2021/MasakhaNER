import './Output.css'
import { FaCopy } from 'react-icons/fa';

export default function Output() {
    return (
        <div className = 'outputSection'>
            <textarea readOnly  id = 'textOutput' placeholder = "..." name='text' ></textarea>
            <div className = "outputButton">  
                <button className = 'btn btn-light'>Give FeedBack on Translation</button>
                <button className = 'btn btn-light'><FaCopy /></button>
            </div>
        </div>
    )
}
