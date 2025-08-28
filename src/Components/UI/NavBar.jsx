import { NavLink } from 'react-router-dom';
import NavStyles from '../../css/NavBar.module.css';
import Settings from '../../assets/settingsLogo.png';
import Controls from '../../assets/controlsLogo.png';
import Inst from '../../assets/instructionsLogo.png';
import Menu from '../../assets/menu.png';
function NavBar() {
  return (
    <>
      <div className={NavStyles.NavBar}>
        <NavLink to="/settings" className={({ isActive }) => `${NavStyles.NavItem} ${isActive ? NavStyles.activeLink : ''}`}>
          <img src={Settings} className={NavStyles.Settings} alt="Settings logo" />
        </NavLink>

        <NavLink to="/controls" className={({ isActive }) => `${NavStyles.NavItem} ${isActive ? NavStyles.activeLink : ''}`}>
          <img src={Controls} className={NavStyles.Controls} alt="Settings logo" />
        </NavLink>

        <NavLink to="/instructions" className={({ isActive }) => `${NavStyles.NavItem} ${isActive ? NavStyles.activeLink : ''}`}>
          <img src={Inst} className={NavStyles.Inst} alt="Settings logo" />
        </NavLink>

        <NavLink to="/" className={({ isActive }) => `${NavStyles.NavItem} ${isActive ? NavStyles.activeLink : ''}`}>
          <img src={Menu} className={NavStyles.Menu} alt="Settings logo" />
        </NavLink>
      </div>
    </>
  );
}
export default NavBar;