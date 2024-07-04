import { GoogleAuthProvider } from 'firebase/auth';
import googleIcon from './assets/google.png';
import { signInWithPopup } from 'firebase/auth';
import { auth } from './config/firebase-config';

function SignInwithGoogle(){
    function googleLogin(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async(result) => {
            console.log(result);
            if (result.user) {
                window.location.href = "/dashboard";
            }
        });
    }
    return(
        <div onClick={googleLogin}>
            <p className="continue-p"> --Or continue with--</p>
            <div>
                <img src={googleIcon} alt="Google icon"/>
            </div>
        </div>
    )
}
export default SignInwithGoogle;