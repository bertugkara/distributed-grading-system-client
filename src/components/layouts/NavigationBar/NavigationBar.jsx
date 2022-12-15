import SignedInNavBar from "./SignedInNavBar";
import SignedOutNavBar from "./SignedOutNavBar";

export default function NavigationBar(props) {

    return (
        <div>
            {props.auth === true ? <SignedInNavBar auth={true} accountType={props.accountType} signOut={props.handleLogout}/> : <SignedOutNavBar/>}
        </div>
    );
}