import { Fragment, useContext, useEffect } from 'react';
import { SocketContext } from '../context/socket';

const Sockets = (): JSX.Element => {
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('new_user', (payload) => {
            console.log(payload);
        });

        socket.on('user_signed_out', (payload) => {
            console.log(payload);
        });

        return () => {
            socket.off('new_user');
            socket.off('user_signed_out');
        };
    }, [socket]);

    return <Fragment></Fragment>;
};

export default Sockets;
