import  { useContext, useState ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/UserContextProvider';
import axiosInstance from '../axios';
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
            console.log(user)
            getUser();
            alert("redirecting...")
            console.log("redirecting....")
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
                console.log("rannn")
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
                setError(error.response.data.msg);
            } else {
                setError("Something went wrong");
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleClickAuthLogin=(provider)=>{
        window.open(`http://localhost:4000/api/auth/${provider}`, "_self");
    }

    return (
        <div className='flex items-center justify-center h-[100vh] w-[100vw] bg-[#dddddd]'>
            <div className='flex flex-col gap-[20px] bg-white w-fit h-fit p-8 rounded '>
                <h1 className='text-3xl'>Login here</h1>

                {/* api error feedback  */}
                <span className='feedback text-red-500 text-semibold'>{error}</span>

                <form onSubmit={handleSubmitSignIn} className='flex flex-col gap-3 '>

                    <input required className='p-2 border-b-2 outline-none' type="email" placeholder='enter email'
                        name='email' value={userData.email} onChange={handleUserData} />

                    <input required className='p-2 border-b-2  outline-none' type='password' placeholder='enter password'
                        name='password' value={userData.password} onChange={handleUserData} />


                    <button disabled={isLoading} className={`p-2 px-4 border-none bg-[#5551FF] rounded text-white font-semibold w-fit ${isLoading && "bg-[#a9a8e9]"}`} type='submit'>
                        {isLoading ? "wait..." : "Sign In"}
                    </button>

                    {/* page toggle for new user */}
                    <span>New user? <Link to="/register"><span className='text-[#5551FF]'>Register here</span></Link></span>
                </form>
                <div className="flex gap-2 justify-between">
                    <div onClick={()=>handleClickAuthLogin("google")}>Google</div>
                    <div onClick={()=>handleClickAuthLogin("github")}>Github</div>
                    {/* <div onClick={()=>handleClickAuthLogin("linkedin")}>linkedin</div> */}
                </div>

            </div>
        </div>
    )
}

export default Login;
