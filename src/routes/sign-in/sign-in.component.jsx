import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../services/firebase.service";

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
    </div>
  );
};

export default SignIn;
