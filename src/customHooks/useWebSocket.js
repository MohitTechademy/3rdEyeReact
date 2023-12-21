import { useCallback, useEffect, useRef, useState } from 'react';
import { localStorageHelper } from '../utils';
import useWebSocket, { ReadyState, closeWebSocket } from 'react-use-websocket';

const useCustomWebSocket = (url, roomId, onWebsocketError, onWebSocketOpen, onWebsocketMessage) => {
  const tenantName = localStorageHelper.get('tenantName');
  const { sendJsonMessage, sendMessage, lastMessage, readyState } = useWebSocket(`${url}/${tenantName}/lms/live_updates/api/v1/${roomId}`, {
    onOpen: (event) => {
      onWebSocketOpen(event)
    },
    onError: (event) => {
      console.error(`=========onError==============`, event)
      onWebsocketError(event);
    },
    onMessage: (event) => {
      console.info(`=========onMessage==============`, event)
      onWebsocketMessage(event)
    }
  });

  useEffect(() => {
    if (lastMessage !== null) {
      console.info(`=====lastMessage=======`, lastMessage)
    }
  }, [lastMessage]);
  useEffect(() => {
    return () => {
      if (readyState === ReadyState.OPEN) {
        // sendJsonMessage({ type: 'close' }); // Send a close message
        closeWebSocket()
      }
    };
  }, [readyState]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  console.info(`=====useWebSocket===ConnectionStatus================`, connectionStatus)
  return {
    // webSocketInstance: webSocketInstance?.current,
    // isSocketOpen,
    // getWebSocket: getWebSocket,
    sendMessage,
  };
}
// const useCustomWebSocket = (url, roomId, getRoomIdFn, onWebsocketError, onWebSocketOpen, onMessage) => {
//   console.info(`url, roomId, getRoomIdFn, onWebsocketError, onWebSocketOpen, onMessage`);
//   console.info(url, roomId, getRoomIdFn, onWebsocketError, onWebSocketOpen, onMessage);
  
//   const webSocketInstance = useRef(null);
//   const messageQueue = useRef([]);
//   const [isSocketOpen, setIsSocketOpen] = useState(false);
//   const resetWebSocket = useCallback(() => {
//     if (
//       webSocketInstance?.current?.readyState === 1 ||
//       webSocketInstance?.current?.readyState === 0
//     ) {
//       console.info('=======ResetWebSocket============', webSocketInstance?.current);
//       console.info('=======ResetWebSocket======roomId======', roomId);
//       console.info('=======ResetWebSocket======url======', url);
//       webSocketInstance?.current?.close?.();
//     }
//     webSocketInstance.current = null;
//     setIsSocketOpen(false);
//   }, []);
//   useEffect(() => {
//     return () => {
//       resetWebSocket();
//     };
//   }, []);
//   useEffect(() => {
//     if (roomId && url) {
//       if (webSocketInstance.current) {
//         console.info('==webSocketInstance.current======', webSocketInstance);
//         resetWebSocket();
//       }
//       webSocketInstance.current = new WebSocket(
//         `${url}/${localStorageHelper.get(
//           'tenantName'
//         )}/lms/live_updates/api/v1/${roomId}`
//       );
//       webSocketInstance.current.onopen = (event) => {
//         if (
//           event?.type === 'open' &&
//           webSocketInstance?.current?.readyState === 1
//         ) {
//           onWebSocketOpen(webSocketInstance.current);
//           setIsSocketOpen(true);
//         }
//       };
//     }
//   }, [roomId, url, resetWebSocket, onWebSocketOpen]);

//   useEffect(() => {
//     if (isSocketOpen) {
//       webSocketInstance.current.onmessage = (event) => {
//         onMessage(event);
//       };
//       webSocketInstance.current.onerror = () => {
//         webSocketInstance.current = null;
//         setIsSocketOpen(false);
//         onWebsocketError();
//         getRoomIdFn();
//       };
//     }
//   }, [onMessage, isSocketOpen, getRoomIdFn]);

//   const getWebSocket = useCallback(() => {
//     return webSocketInstance?.current;
//   }, []);
//   const sendMessage = useCallback((message, keep = true) => {
//     if (webSocketInstance.current?.readyState === 1) {
//       webSocketInstance?.current?.send?.(message);
//     } else if (keep) {
//       messageQueue?.current?.push?.(message);
//     }
//   }, []);
//   useEffect(() => {
//     if (webSocketInstance?.current?.readyState === 1) {
//       messageQueue?.current?.splice?.(0).forEach?.((message) => {
//         sendMessage(message);
//       });
//     }
//   }, [webSocketInstance?.current?.readyState, sendMessage]);
//   useEffect(() => {
//     return () => {
//       webSocketInstance.current = null;
//       messageQueue.current = null;
//       setIsSocketOpen(false);
//     };
//   }, []);
//   return {
//     webSocketInstance: webSocketInstance?.current,
//     isSocketOpen,
//     getWebSocket: getWebSocket,
//     sendMessage: sendMessage,
//   };
// };
export default useCustomWebSocket;
