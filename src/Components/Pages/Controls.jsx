import { useNavigate } from 'react-router-dom';
import ControlsStyle from '../../css/Controls.module.css';
import Nav from '../UI/NavBar';
function Controls() {
     const navigate = useNavigate();
     return (
       <>
         <h1>Controls</h1>
         <button className={ControlsStyle.backButton} onClick={() => navigate(-1)}>
           &larr; Back
         </button>
         <Nav/>
       </>
     );
}
export default Controls;