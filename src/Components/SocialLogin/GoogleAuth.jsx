import { GoogleLogin } from "@react-oauth/google"
import jwtDecode from "jwt-decode";
function GoogleAuth() {
    function success(data){
        console.log(data.credential);
        console.log(jwtDecode(data.credential));
    }
  return (
     <div className=" translate-y-2">
         <GoogleLogin
    auto_select={false}
    onSuccess={success}
    onError={() => {
      console.log('Login Failed');
      
    }}
  />
     </div>
  )
}

export default GoogleAuth;

// import { useGoogleLogin } from '@react-oauth/google';

// function GoogleAuth(){
//   const login = useGoogleLogin({
//     onSuccess: codeResponse => console.log(codeResponse.access_token)
//   });
  
//   return (
//     <button onClick={() => login()}>
//     Sign in with Google 🚀{' '}
//   </button>
//   )
// }
// export default GoogleAuth;