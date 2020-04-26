import React, { useState, useEffect, createContext } from 'react';

export const SubscribeContext = createContext();

const SubscribeContextProvider = (props) => {

    const [subscribes, setSubscribes] = useState([]);

    const follow = (id) => {
        if (subscribes.includes(id)) {
            return true;
        } else {
            setSubscribes(prevState => [...prevState, id]);

        }
    }

    const unFollow = (id) => {
        setSubscribes((prevState) => {
            prevState.filter((sub) => sub !== id)
        });
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
        const response = await fetch(`/users/subscribe`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, subscribes })
        })

        const resJson = await response.json();
    }

    const getSubscribes = async () => {
        const id = getIdOfCurrentUser();
        const response = await fetch(`users/subscribes/${id}`);
        const resJson = await response.json();

        console.log(resJson);

        if (resJson.subscribes === null) {
            setSubscribes([]);
            return true;
        }
        setSubscribes(resJson.subscribes)
        console.log(resJson);
    }

    useEffect(() => {
        getSubscribes();
    }, [])

    useEffect(() => {
        putSubscribes();
    }, [subscribes])

    return (
        <SubscribeContext.Provider value={{ follow, unFollow, getIdOfCurrentUser }}>
            {props.children}
        </SubscribeContext.Provider>
    );
}

export default SubscribeContextProvider;
