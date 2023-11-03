import sample from "../../assets/images/sample.jpg";
import { BiSearch } from 'react-icons/bi';
// import { GrProjects } from 'react-icons/gr';
import { AiOutlineTeam, AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineWidthNormal } from 'react-icons/md';
import { VscNewFile } from 'react-icons/vsc';
import "./NavBar.scss";

const NavBar = () => {
    return (
        <nav className="nav">
            <div className="nav__cntr-1">

                <h3 className="nav__logo">kubI</h3>

                <div className="nav__search-div">
                    <BiSearch/>
                    <input type="search" className="nav__search" />
                </div>
                <ul className="nav__menu">
                    {/* <li className="nav__list"><GrProjects/> Projects</li> */}
                    <li className="nav__list--project"><MdOutlineWidthNormal/> Projects</li>
                    <li className="nav__list--team"><AiOutlineTeam/> Teams</li>
                    <li className="nav__list--create"><VscNewFile/> New Project</li>
                </ul>
            </div>
            <div className="nav__cntr-2">
                <div className="nav__list--setting">
                  <AiOutlineSetting/>  Settings
                </div>
                <div className="nav__img-div">
                    <img src={sample} alt="Woman in a red blouse smiling at the camera." className="nav__img" />
                </div>
            </div>
        </nav>
    )
}
export default NavBar; 