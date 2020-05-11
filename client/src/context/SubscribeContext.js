import React, { useState, createContext, useEffect } from 'react';

export const SubscribeContext = createContext();

const SubscribeContextProvider = (props) => {

    const [subscribes, setSubscribes] = useState([]);

    const follow = async (id) => {
        if (subscribes.includes(id)) {
            return true; //should set an error message to alert
        } else {
            await setSubscribes(prevState => [...prevState, id]);
            putSubscribes();
        }
    }

    const unFollow = async (id) => {
        let newsub = await subscribes.filter(sub => sub !== id)
        setSubscribes(newsub);
        putSubscribes();
    }

    const getIdOfCurrentUser = () => {
        const authData = JSON.parse(localStorage.getItem("authData"));
        if (authData === null) {
            return null;
        }
        const id = authData.user.id;
        return id;
    }

    const putSubscribes = async () => {
        const id = getIdOfCurrentUser();
        if (id === null) {
            return;
        }
        await fetch(`/users/subscribe`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, subscribes })
        })
    }

    const getSubscribes = async (id) => {
        const res = await fetch(`/users/subscribes/${id}`);
        const json = await res.json();
        setSubscribes(json);
    }

    useEffect(() => {
        const id = getIdOfCurrentUser();
        getSubscribes(id);
    }, [])

    return (
        <SubscribeContext.Provider value={{ follow, unFollow, getIdOfCurrentUser }}>
            {props.children}
        </SubscribeContext.Provider>
    );
}

export default SubscribeContextProvider;
