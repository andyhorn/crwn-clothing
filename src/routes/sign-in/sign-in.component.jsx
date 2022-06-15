import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../services/firebase.service";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  const loginGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(response.user);
    console.log(userDocRef);
  };

  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={loginGoogleUser}>Sign in with Google</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
