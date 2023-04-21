import {CgProfile} from "react-icons/cg";
import "../index.css"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {LogOutThunk} from "../../../Services/Users-Thunks.js";
import {logoutUser} from "../../../Reducers/UserLogin-Reducer.js";

const NavComponent = () => {
    const {u} = useSelector(state => state.UserLogin);

    const dispatch = useDispatch();

    const CallLogOut = () => {
        dispatch(LogOutThunk());
        dispatch( logoutUser());

    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">

                    <div className={u._id? " wd-lol" : " wd-withoutlogin "} id="navbarNavDropdown">


                            <ul className=" wd-navlinks navbar-nav wd-lop">

                                {
                                    u._id ?
                                    <>

                                            <Link to="/" className=" wd-removeunderline">Concerts</Link>

                                    </> :
                                    <>
                                        <Link  to="/login" className=" wd-removeunderline">Concerts</Link>
                                    </>


                                }

                            </ul>

                            <ul className=" wd-navlinks navbar-nav ">

                                {
                                    u._id ?<Link to="/" className="  wd-removeunderline">Movies</Link> :  <Link   to="/login" className=" wd-removeunderline">Movies</Link>

                                }


                            </ul>
                    </div>


                </div>

                <div className="wd-dropdown">

                    {u._id ?  <Link className="wd-signin wd-removeunderline" to="/Profile"> Profile </Link> :  <Link className="wd-login wd-removeunderline" to="/logIn"> LogIn </Link> }
                    {u.Role === 'Seller' ? <Link className="wd-signin wd-removeunderline" to="/importEvents"> Create Event </Link> : " " }
                    {u._id ? <Link className="wd-signin wd-removeunderline" to="/" onClick={CallLogOut}> LogOut </Link> : " " }
                    {u.Role === 'Buyer' ? <Link className="wd-signin wd-removeunderline" to="/myTickets"> My Tickets </Link>: " "  }
                    <CgProfile size={25} className={ u._id ? "wd-signinlogo " : "wd-signinlogowithoutlogin" } />
                </div>

            </nav>
        </div>
    );
}

export default NavComponent;