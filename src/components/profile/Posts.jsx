import React,{useState,useEffect,useContext} from 'react'
import Pet from '../Pet'
import axiosInstance from '../../axios'
import { userContext } from '../../context/UserContextProvider'
import NoResult from '../../shared/NoResult'
import {toast} from "react-hot-toast"
import LoaderBox from '../../shared/LoaderBox'
const Posts = ({setPostCount}) => {
    const [userPosts , setUserPosts] = useState([])
    const [isPostsLoading , setIsPostsLoading] = useState(false);
    const { User, setUser } = useContext(userContext);

    useEffect(() => {
        async function getUserPosts(User) {
            try {
                setIsPostsLoading(true)
                const response = await axiosInstance.get(`/post/getall/${User}`);
                if(response.status === 200){
                    setUserPosts(response?.data?.posts);
                    setPostCount(response?.data?.posts?.length)
                }
            } catch (error) {
                console.log(error);
                if(error?.response?.data?.msg){
                    toast.error(error?.response?.data?.msg)
                }else{
                    toast.error("something went wrong on server")
                }
            }finally{
                setIsPostsLoading(false)
            }
        };
        if (User) { getUserPosts(User); }
    }, [User])

    if(isPostsLoading) return <LoaderBox/>
    if(userPosts.length<=0)return <NoResult/>

    return (
        <>

            {userPosts &&
                userPosts?.map((post) => {
                    return <Pet key={post._id} {...post} />
                })
            }
        </>
    )
}

export default Posts