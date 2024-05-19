import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContextProvider";
import LoginUser from "../../../../api/UserAuthorization/LoginUser";
import backImage from '../../../../assets/images/backImg.jpg'
import frontImage from '../../../../assets/images/frontImg.jpg'
import '../Login/Index.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faLock, faUser,faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify";
import SignUpUser from "../../../../api/UserAuthorization/SignUpUser";
interface LoginProps {
  action: string;
}
const LoginOrSignUp: React.FC<LoginProps> = ({action})  => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailSignup, setEmailSignup] = useState("");
    const [passwordSignUp, setPasswordSignUp] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("")
    const navigate = useNavigate();
    const {AuthData,dispatch} = useContext(AuthContext);
    const location=useLocation();
    const GoBack=()=>{
      const doesAnyHistoryEntryExist = location.key !== "default";
            if(doesAnyHistoryEntryExist)
            {
                navigate(-1)
                console.log('navigating Back')
            }
            else{
                navigate('/')
            }
    }
    const Loginhandle=async (e: any) => {
      e.preventDefault();
      if (!e.currentTarget.checkValidity())
      {
        return;
      }
        if(AuthData?.userAuthenticationData!=null)
        {
            console.log('Already Logged In, Logout to login Again')
        }
        else
        {
            var result=await LoginUser({UserNameOrEmail:email,Password:password})
            if(result!=null)
            {
            dispatch({type:'LOGIN',newState:result})
            toast.success('Logged In SuccessFully')
            GoBack();
            }           
        }
    };
    const SignUpHandle=async (e:any)=>{
      e.preventDefault();
      if (!e.currentTarget.checkValidity())
      {
        return;
      }
      var result=await SignUpUser({
        Email: emailSignup,
        Password: passwordSignUp,
        UserName: userName,
       FirstName:firstName,
       LastName:lastName
      })
      if(result!=null && result.IsSuccess)
      {
      toast.success('Sign Up SuccessFull')
      GoBack();
      }
      else
      {
        if(result!=null && result.ValidationResult!=null)
        {
        setValidationErrors(result.ValidationResult.errors);
      }
      }
    }
    useEffect(() => {
      // Use setTimeout to ensure the DOM has fully loaded the checkbox
      setTimeout(() => {
          const flipCheckbox = document.getElementById('flip') as HTMLInputElement;
          // Check if the action prop's state matches the checkbox state, if not, click it
          if ((action === 'SignUp' && !flipCheckbox.checked) || (action !== 'SignUp' && flipCheckbox.checked)) {
              flipCheckbox.click();
          }
      }, 0); // setTimeout with 0 delay ensures this runs after the DOM updates
  }, [action]);
    return (
        <div className="outer-container">
          <ToastContainer/>
        <div className="container">
      <input type="checkbox" id="flip" />
      <div className="cover">
        <div className="front">
          <img src={frontImage} alt="" />
          <div className="text">
            <span className="text-1">Every new friend is a <br /> new adventure</span>
            <span className="text-2">Let's get connected</span>
          </div>
        </div>
        <div className="back">
          <img className="backImg" src={backImage} alt="" />
          <div className="text">
            <span className="text-1">Complete miles of journey <br /> with one step</span>
            <span className="text-2">Let's get started</span>
          </div>
        </div>
      </div>
      <div className="forms">
        <div className="form-content">
          <div className="login-form">
            <div className="title">Login</div>
            <form onSubmit={Loginhandle}>
              <div className="input-boxes">
                <div className="input-box">
                <FontAwesomeIcon icon={faEnvelope} />
                  <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="input-box">
                <FontAwesomeIcon icon={faLock} />
                  <input type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="text"><a href="#">Forgot password?</a></div>
                <div className="button input-box">
                  <input type="submit" value="submit" />
                </div>
                <div className="d-flex justify-content-between align-content-center pt-2">
                <div className="text ">Don't have an account? <label htmlFor="flip" className="pt-2">Signup now</label></div>
                <button className="btn btn-info" onClick={()=>navigate('/')}>Go Back</button>
                </div>
              </div>
            </form>
          </div>
          <div className="signup-form">
            <div className="title">Signup</div>
            <form onSubmit={SignUpHandle}>
              <div className="input-boxes">
                <div className="d-flex bg-black"> 
                <div className="input-box input-box2">
                <FontAwesomeIcon icon={faAddressCard} />
                  <input type="tel" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  {validationErrors.MobileNumber && <div className="error-message">{validationErrors.MobileNumber[0]}</div>}
                </div>
                <div className="input-box input-box2">
                  <input type="tel" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  {validationErrors.MobileNumber && <div className="error-message">{validationErrors.MobileNumber[0]}</div>}
                </div>
                </div>
              <div className="input-box">
              <FontAwesomeIcon icon={faEnvelope} />
                  <input type="text" placeholder="Enter your email" required value={emailSignup} onChange={(e) => setEmailSignup(e.target.value)}/>
                  {validationErrors.Email && <div className="error-message">{validationErrors.Email[0]}</div>}
                </div>
                <div className="input-box">
                <FontAwesomeIcon icon={faUser} />
                  <input type="text" placeholder="Enter your User name" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                  {validationErrors.UserName && <div className="error-message">{validationErrors.UserName[0]}</div>}
                </div>
                <div className="input-box">
                <FontAwesomeIcon icon={faLock} />
                  <input type="password" placeholder="Enter your password" required value={passwordSignUp} onChange={(e) => setPasswordSignUp(e.target.value)} />
                  {validationErrors.Password && <div className="error-message">{validationErrors.Password[0]}</div>}
                </div>
                <div className="button input-box">
                  <input type="submit" value="Submit" />
                </div>
                
                <div className="d-flex justify-content-between align-content-center pt-2">
                <div className="text">Already have an account? <label htmlFor="flip" className="pt-2">Login now</label></div>
                <button className="btn btn-info" onClick={()=>navigate('/')}>Go Back</button>
            </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default LoginOrSignUp;
