import React, {useEffect, useReducer, useRef} from 'react';
import axios from 'axios';

import './index.css'

import reducer from './reducer';
import Chat from '../Chat';
import io from "socket.io-client";
import {useSelector} from "react-redux";

const server = 'https://workkeeper.ru'

function App() {

    const {name, surname} = useSelector(state => state.user)

    const chat = '123'

    const socketRef = useRef();

    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: [],
    });

    let obj = {roomId: chat, userName: name + ' ' + surname}

    useEffect(  () => {

        socketRef.current = io.connect(server);

        (async () => {
            await axios.post(`${server}/rooms`, obj);

            dispatch({
                type: 'JOINED',
                payload: obj,
            });

            socketRef.current.emit('ROOM:JOIN', obj);
            const { data } = await axios.get(`${server}/rooms/${obj.roomId}`);
            dispatch({
                type: 'SET_DATA',
                payload: data,
            });
        })()


        return () => {
            socketRef.current.disconnect()
        }

    }, [])


    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users,
        });
    };

    const addMessage = (message) => {
        dispatch({
            type: 'NEW_MESSAGE',
            payload: message,
        });
    };

    useEffect(() => {
        socketRef.current.on('ROOM:SET_USERS', setUsers);
        socketRef.current.on('ROOM:NEW_MESSAGE', addMessage);
    }, []);


    return (
      <Chat userInfo={name + ' ' + surname} {...state} socketRef={socketRef} onAddMessage={addMessage} />
    );
}

export default App;
