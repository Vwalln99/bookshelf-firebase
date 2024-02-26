import { auth } from "./firebaseInit";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "@mui/material";

export default function SignInButton(){
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
};
return(
    <Button variant="outlined" onClick={signInWithGoogle}>
        Sign up
    </Button>
);
}