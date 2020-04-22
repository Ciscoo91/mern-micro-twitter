import React, { useState, useEffect, createContext } from 'react';
import { PromiseProvider } from 'mongoose';

export const SubscribeContext = createContext();

const SubscribeContextProvider = (props) => {

    const [subscribes, setSubscribes] = useState([]);

    const subscribe = (id) => {
        setSubscribes(...subscribes, id);
    }

    const unsubscribe = (id) => {
        setSubscribes((prevState) => {
            prevState.filter((sub) => sub !== id)
        });
    }

    const putSubscribes = async () => {
        const response = await fetch(``, {
            method: "PUT",
            body: {
                subscribes
            }
        })

        const resJson = await response.json();
        console.log(resJson);
    }

    useEffect(() => {
        putSubscribes();
    }, [subscribes])

    return (
        <SubscribeContext.Provider value={{ subscribe, unsubscribe }}>
            {props.children}
        </SubscribeContext.Provider>
    );
}

export default SubscribeContextProvider;
