import React, { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext();


const AuthContextProvider = (props) => {

    const [user, setUser] = useState({ isLoggedIn: false, data: null });

    const logIn = (data) => {
        setUser({ isLoggedIn: true, data });
    }

    const logOut = () => {
        window.localStorage.removeItem("currentUrl");
        window.localStorage.removeItem("authData");
        setUser({ isLoggedIn: false, data: null })
    }


    useEffect(() => {
        let authData = window.localStorage.getItem('authData');
        // console.log(authData);
        let userLogged = JSON.parse(authData);
        if (authData !== null) {
            setUser({ isLoggedIn: true, data: userLogged })
        }
    }, []);

    // useEffect(() => {
    //     window.localStorage.setItem('authData', JSON.stringify(user.data));
    // }, [user.data])

    // const providerValue = useMemo(() => ({ user, logOut, logIn }), [user, setUser])

    return (
        <AuthContext.Provider value={{ logOut, logIn, user }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;