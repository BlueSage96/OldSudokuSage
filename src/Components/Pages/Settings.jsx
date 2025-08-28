import { useNavigate } from 'react-router-dom';
import SettingsStyle from '../../css/Settings.module.css';
import Nav from '../UI/NavBar';
function Settings() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Settings</h1>
      <button className={SettingsStyle.backButton} onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <Nav/>
    </>
  );
}
export default Settings;