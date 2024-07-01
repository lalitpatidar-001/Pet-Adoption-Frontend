import  { useContext, useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/UserContextProvider';
import axiosInstance, { urlPath } from '../axios';
import google_icon from "../assets/google-icon.png"
import Inputbox from '../shared/Inputbox';
import ButtonPrimary from '../shared/ButtonPrimary';
import {toast} from "react-hot-toast"
import cover_photo from "../assets/cover-photo.jpg"
import AuthHeader from '../shared/AuthHeader';
import AuthActions from '../shared/AuthActions';
const initialValue = {
    email: "",
    password: ""
};
function Login() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(""); // api error feedback
    const { setUser } = useContext(userContext);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const user = urlParams.get('user');
        if (user) {
            // get user data if redirected from oauth authentication.
            getUser();
        }
    },[]);

        async function getUser(){
          try{
            console.log("get user called")
            const response = await axiosInstance.get("/auth/login/success");
            console.log("my response",response);
            if(response.status===200){
                console.log(response)
              let userId = response.data?._id;
                  localStorage.setItem("user-data", JSON.stringify(userId));
                  userId = userId.replace(/"/g, '');
                  setUser(userId);
                  navigate("/");
            }
          }catch(error){
            console.log(error);
          }
        }


    // set inputs to userData state
    const handleUserData = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({ ...prevData, [name]: value }));
    }

    // login user api call
    const handleSubmitSignIn = async (e) => {
        e.preventDefault();
        setError("")
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/auth/login", userData)
            if (response.status === 200) {
                let userId = response.data.sendData?._id;
                localStorage.setItem("user-data", JSON.stringify(userId));
                userId = userId.replace(/"/g, '');
                setUser(userId);
                navigate("/");
            }
        }
        catch (error) {
            console.log(error);
            if (error.response && error.response.data.msg) {
                // setError(error.response.data.msg);
                toast.error(error.response.data.msg)
            } else {
                toast.error("Something went wrong");
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    // oauth click handler
    const handleClickAuthLogin=(provider)=>{
        window.open(`${urlPath}/api/auth/${provider}`, "_self");
    }

    return (
        <div className="flex items-center  justify-center h-screen bg-[#dddddd]">
            <div className="flex items-center max-w-[600px] justify-center md:h-1/2  ">

                <div className="flex-1 bg-blue-300  rounded-l-lg overflow-hidden">
                        <img className="h-[405px]  w-full" src={cover_photo} alt="cover_photo"/>
                </div>

                <div className='flex flex-1 flex-col  gap-[20px] bg-white w-fit h-fit p-4 py-9 rounded-r-lg '>

                <AuthHeader
                    heading="Login to Pet-Adoption"
                    message="Welcome back, please enter credentials"
                />

                

                {/* api error feedback  */}
                <span className='feedback text-red-500 text-semibold'>{error}</span>

                <form onSubmit={handleSubmitSignIn} className='flex flex-col gap-3 '>

                <Inputbox
                type="email"
                 placeholder="example@gmail.com"
                 name="email"
                 value={userData.email} 
                 onChange={handleUserData}

                />
                <Inputbox
                type="password"
                 placeholder="Enter password"
                 name="password"
                 value={userData.password} 
                 onChange={handleUserData}

                />

            <ButtonPrimary
            isLoading={isLoading}
            title="Sign In"
            type="submit"
            />


                    {/* page toggle for new user */}

                    <AuthActions
                    path="/register"
                    message="New user?"
                    text="Register here"
                    />
                </form>

                <div className="flex gap-2 justify-between p-2 w-full shadow-sm shadow-[#101010] drop-shadow-lg drop-shadow-black rounded-lg">
                    <div onClick={()=>handleClickAuthLogin("google")}
                         className="flex justify-start gap-3 items-center w-full">
                        <img className="h-5 w-5" src={google_icon} alt="google icon"/>
                        <span className="text-[#101010] cursor-pointer text-[14px] font-semibold hover:text-blue-600">Sign In With Google</span>
                    </div>
                </div>

            </div>
            </div>
        </div>
    )
}

export default Login;
