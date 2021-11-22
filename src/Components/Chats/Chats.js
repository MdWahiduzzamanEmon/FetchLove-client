import React, { useEffect, useState } from 'react';
import socketIO from "socket.io-client";
import {useNavigate} from 'react-router'
import useFirebase from '../../Hooks/useFirebase';
const ENDPOINT = "http://localhost:500/";
const Chats = () => {
   
    const { user, logOut, isloading } = useFirebase();
    const name = user?.displayName;
    const navigate=useNavigate()
    const hanldelogOut = () => {
        navigate('/');
        logOut();
    }
  
     
         useEffect(() => {
           let socket = socketIO(ENDPOINT, {
             transports: ["websocket"],
           });
             if (!user) {
                 return;
             }
           socket.on("connect", () => {
             // alert("connected");
           });
           console.log(socket);
           socket.emit("joined", { name });

           socket.on("welcome", (data) => {
             console.log(data.user, data.message);
           });
           socket.on("userJoined", (data) => {
             console.log(data.user, data.message);
           });

             return () => {
                 socket.emit("disconnect");
                 socket.off();
             }
         }, [name,user]);
    
   
    return (
      <>
        {isloading ? (
          "loading"
        ) : (
          <div>
            chat {user?.displayName}
            <button onClick={hanldelogOut}>logout</button>
          </div>
        )}
      </>
    );
};

export default Chats;