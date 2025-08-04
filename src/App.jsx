import { Outlet } from 'react-router-dom';
import AppStyles from 'styled-components';
import './css/App.css';

const Apps = AppStyles.div`
    height: 900px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
`;

function App() {
  return (
    <>
      <Apps>
        <Outlet></Outlet>
      </Apps>
    </>
  );
}

export default App;
