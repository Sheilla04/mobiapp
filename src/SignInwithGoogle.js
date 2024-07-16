import { GoogleAuthProvider } from 'firebase/auth';
import googleIcon from './assets/google.png';
import { signInWithPopup } from 'firebase/auth';
import { auth, db } from './config/firebase-config';
import { doc, setDoc } from 'firebase/firestore';

function SignInwithGoogle(){
    function googleLogin(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(async(result) => {
            console.log(result);
            const user = result.user;
            if (result.user) {
                await setDoc(doc(db,"Users", user.uid), {
                    email:user.email,
                    name:user.displayName,
                    photo:user.photoURL,
                  });
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