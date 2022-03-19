import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom'

//accepting url as a prop...thus destructuring the prop
const BackButton = ({url}) => { 
    return (
        <Link to={url} className='btn btn-reverse btn-back'><FaArrowCircleLeft />Back</Link>
    )
}

export default BackButton