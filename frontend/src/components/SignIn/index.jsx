import React, {useEffect, useReducer, useRef} from 'react';
import axios from 'axios';

import './index.css'

import reducer from './reducer';
import Chat from '../Chat';
import {useSelector} from "react-redux";
import io from "socket.io-client";


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



        socketRef.current = io(process.env.REACT_APP_SERVER_URL);

        (async () => {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/rooms`, obj);

            dispatch({
                type: 'JOINED',
                payload: obj,
            });

            socketRef.current.emit('ROOM:JOIN', obj);
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/rooms/${obj.roomId}`);
            dispatch({
                type: 'SET_DATA',
                payload: data,
            });

        })()

        socketRef.current.on('ROOM:SET_USERS', setUsers);
        socketRef.current.on('ROOM:NEW_MESSAGE', addMessage);

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



    return (
      <Chat userInfo={name + ' ' + surname} socketRef={ socketRef} {...state} onAddMessage={addMessage} />
    );
}

export default App;
