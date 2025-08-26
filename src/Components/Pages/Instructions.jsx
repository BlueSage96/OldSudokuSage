import { useNavigate } from 'react-router-dom';
import InstStyle from '../../css/Instructions.module.css';
function Instructions() {
     const navigate = useNavigate();
     return (
       <>
         <h1>Instructions</h1>
         <button className={InstStyle.backButton} onClick={() => navigate(-1)}>
           &larr; Back
         </button>
       </>
     );
}
export default Instructions;