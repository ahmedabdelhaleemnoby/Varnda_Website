import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const AuthGoogle = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const query = new URLSearchParams(location.search);
    const errorMessage = query.get('error');
    const token = query.get('token');
    const image = query.get('image');
    const role = query.get('role');
    const email = query.get('email');
    const user_id = query.get('user_id');
    const first_name = query.get('first_name');
    
    const last_name = query.get("last_name");
    const phone = query.get("phone");
    const whats_phone = query.get("whats_phone");
    const user_type = query.get("user_type");
    const bio = query.get("bio");

    
    useEffect(()=>{
        if (errorMessage) {
            console.log(errorMessage);
            setError(errorMessage);
        } else {
            if (token && role) {
                // localStorage.setItem('role', role);
                Cookies.set('token', token);
                Cookies.set("image", image);
                Cookies.set('role', role);
                Cookies.set('email', email);
                Cookies.set("user_id", user_id);
                Cookies.set('first_name', first_name);
                Cookies.set("verify", 'true')
                
                Cookies.set("last_name", last_name)
                Cookies.set("phone", phone)
                Cookies.set("whats_phone", whats_phone)
                Cookies.set("user_type", user_type)
                Cookies.set("bio", bio)
                
                navigate(location.pathname, { replace: true });
                navigate('/');
        }
    }
},[errorMessage,token])


    return (
        <>
            {error &&
                <div>
                <Alert
                variant="warning"
              >
                <p>
                    هذا الحساب موجود بالفعل. قم بالتسجيل عبر الايميل وكلمه السر من هنا 
                    <Alert.Link as={Link} to="/login">
                     .  تسجيل الدخول
                    </Alert.Link>
                  .
                </p>
              </Alert>
            </div>
}
        </>
    );
};

export default AuthGoogle;