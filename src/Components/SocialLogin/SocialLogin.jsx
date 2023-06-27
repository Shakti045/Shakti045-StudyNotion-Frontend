import { FacebookLoginButton, GithubLoginButton,GoogleLoginButton, LinkedInLoginButton} from "react-social-login-buttons";
import { sociallogin } from "../../services/url";
function SocialLogin() {
  const google =() => {
    window.open(sociallogin.googleurl,"_self");
  
  };

  const github = () => {
    window.open(sociallogin.githuburl, "_self");
  };

  
  const linkedin = () => {
    window.open(sociallogin.linkedinurl, "_self");
  };
  
  return (
    <div>
          <div className=" text-pure-greys-200 flex items-center gap-4">
             <p className=" w-[45%] border-b-2"></p>
             <p>or</p>
             <p className=" text-lg w-[45%] border-b-2"></p>
          </div>
          <div className="grid lg:grid-cols-2 text-white">
            <GoogleLoginButton onClick={google}/>
           <GithubLoginButton onClick={github}/>
            <LinkedInLoginButton onClick={linkedin}/>
            <FacebookLoginButton/>
      </div>
    </div>
      
  );
}

export default SocialLogin;


