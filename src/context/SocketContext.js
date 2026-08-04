import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { socket } from "context/socket";

const SocketContext = createContext(null);

function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    function handleConnect() {
      setIsConnected(true);
      setConnectionError(null);

      console.log("Socket.IO conectado:", socket.id);
    }

    function handleDisconnect(reason) {
      setIsConnected(false);

      console.log("Socket.IO desconectado:", reason);
    }

    function handleConnectError(error) {
      setIsConnected(false);
      setConnectionError(error.message);

      console.error("Erro ao conectar ao Socket.IO:", error.message);
    }

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);

      socket.disconnect();
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      socket,
      isConnected,
      connectionError,
    }),
    [isConnected, connectionError]
  );

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
}

function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket deve ser utilizado dentro de um SocketProvider.");
  }

  return context;
}

// Typechecking props for the SocketContext
SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SocketContext, SocketProvider, useSocket };
