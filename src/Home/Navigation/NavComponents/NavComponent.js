import {CgProfile} from "react-icons/cg";
import "../index.css"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {LogOutThunk} from "../../../Services/Users-Thunks.js";

const NavComponent = ( ) =>
{
    const { u } = useSelector(state => state.UserLogin);
    console.log("Before Login In " + u._id);

    const dispatch = useDispatch();

    const CallLogOut = ( )=>
    {
        console.log("Calling login");
        dispatch(LogOutThunk());

    }

    return(
        <div>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">

                <div className="container-fluid">

                    <div className="collapse navbar-collapse wd-lol" id="navbarNavDropdown">

                        <ul className="navbar-nav wd-lop">

                            <Link to="/details" className="wd-removeunderline">Concerts</Link>

                        </ul>

                        <ul className="navbar-nav ">

                            <Link to="/details" className="wd-removeunderline">Movies</Link>

                        </ul>

                    </div>

                </div>

                <div className="wd-dropdown">

                    {u._id ?  <Link className="wd-signin" to="/Profile"> Profile </Link> :  <Link className="wd-signin" to="/logIn"> LogIn </Link> }
                    {u._id ? <Link className="wd-signin" to="/" onClick={CallLogOut}> LogOut </Link> : " " }
                    {u.Role === 'User' ? <Link className="wd-signin" to="/createEvent"> Create Event </Link> : " " }
                    {u.Role === 'Seller' ? <Link className="wd-signin" to="/Profile"> My Tickets </Link>: " "  }
                    <CgProfile size={25} className="wd-signinlogo"/>

                </div>

            </nav>
        </div>
    );
}

export default NavComponent;