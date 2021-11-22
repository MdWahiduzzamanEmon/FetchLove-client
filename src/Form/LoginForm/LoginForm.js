import React from 'react';
import { useNavigate } from 'react-router';
import useFirebase from '../../Hooks/useFirebase';
import logo from '../../image/clipart1877735.png'
import google from '../../image/google-logo-9824-32x32.ico'
const LoginForm = () => {
    const { googleSign, setUser } = useFirebase();
    const navigate=useNavigate()
    const handleGoogleLogin = () => {
        googleSign()
          .then((result) => {
              setUser(result.user);
              navigate("/chats");
          })
          .catch((error) => {});
    }


    return (
      <div className="border loginStyle">
        <section>
          <img src={logo} alt="" style={{ width: "20%" }} />
          <div>
            <h1 className="textStyle pb-3">Welcome to FetchLove</h1>
            <section className="my-4 h-100">
              <div className="wrap">
                <button className="button" onClick={handleGoogleLogin}>
                  {" "}
                  <img src={google} alt="" /> Continue with Google
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    );
};

export default LoginForm;