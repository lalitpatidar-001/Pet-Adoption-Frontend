import io from "socket.io-client";


let socket;
const urlPath = import.meta.env.VITE_REACT_APP_ENV_MODE==="Development" ? "http://localhost:4000":"https://api-pet-adoption-website.vercel.app"
const connectSocket = (user_id, callback) => {
    console.log("user_iddd", user_id); // Verify user_id value
    socket = io(urlPath, {
        query: `user_id=${user_id}`
    });

    // Call the callback function after the socket connection is established
    // socket.on("connect", () => {
    //     callback(socket);
    // });
}
// 
export { socket, connectSocket };