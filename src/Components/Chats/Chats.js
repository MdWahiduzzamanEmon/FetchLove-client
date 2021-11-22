import React, { useEffect, useRef, useState } from 'react';
import socketIO from "socket.io-client";
import {useNavigate} from 'react-router'
import useFirebase from '../../Hooks/useFirebase';
import {Dropdown, Form, Spinner} from 'react-bootstrap'
import Message from '../Message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";


const ENDPOINT = "https://ancient-springs-31397.herokuapp.com/";
let socket;
const Chats = () => {
   
    const { user, logOut, isloading } = useFirebase();
    const [message, setMessage] = useState("")
    const [chatMessages,setChatMessages]=useState([])
    const [id,setid]=useState()
    const name = user?.displayName;
    const navigate = useNavigate()
    
    const hanldelogOut = () => {
        navigate('/');
        logOut();
    }

    
    const send = (e) => {
        e.preventDefault()
        socket.emit("message", { message,id });
        e.target.reset()
    }
  
     
         useEffect(() => {
           socket = socketIO(ENDPOINT, {
             transports: ["websocket"],
           });
           if (!user) {
             return;
           }
           socket.on("connect", () => {
             // alert("connected");
             setid(socket.id);
           });
           socket.emit("joined", { name });

           socket.on("welcome", (data) => {
             setChatMessages([...chatMessages, data]);
           });
           socket.on("userJoined", (data) => {
             setChatMessages([...chatMessages, data]);
           });
           socket.on("leave", (data) => {
             setChatMessages([...chatMessages, data]);
           });

           return () => {
             socket.on("disconnect");
             socket.off();
           };
         }, [name, user]);

    useEffect(() => {
      socket.on("sendMessage", (data) => {
        setChatMessages([...chatMessages, data]);
      });
        return () => {
            socket.off()
        }
    }, [chatMessages]);


    return (
      <>
        {isloading ? (
          <Spinner animation="grow" variant="danger" />
        ) : (
          <div>
            <section className="text-end d-flex me-4 justify-content-end align-items-center">
              <Dropdown className=" mx-3">
                <Dropdown.Toggle
                  className="bg-white border-0"
                  id="dropdown-basic"
                >
                  <img src={user?.photoURL} alt="" className="dpImg" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="d-flex flex-column justify-content-center align-items-center">
                  <div className="p-4 fw-bold">{user.displayName}</div>
                  <button onClick={hanldelogOut} className="button2">
                    logout
                  </button>
                </Dropdown.Menu>
              </Dropdown>
            </section>

            <div className="border rounded-3 w-75 mx-auto mt-5 height ">
              <ReactScrollToBottom className="div-height">
                {chatMessages?.map((msg, index) => (
                  <Message
                    key={index}
                    user={msg.id === id ? "" : msg.user}
                    message={msg.message}
                    classs={msg.id === id ? "right" : "left"}
                  />
                ))}
              </ReactScrollToBottom>
              <div className="send_fileld ">
                {" "}
                <form
                  onSubmit={send}
                  className=" d-flex justify-content-center"
                >
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Text..."
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className="btn button2" type="submit">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
};

export default Chats;