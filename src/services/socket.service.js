import io from 'socket.io-client'
// import {httpService} from './http.service'

// export const SOCKET_EMIT_USER_WATCH = 'user-watch';
// export const SOCKET_EVENT_USER_UPDATED = 'user-updated';
// export const SOCKET_EVENT_REVIEW_ADDED = 'review-added';
// export const SOCKET_EVENT_REVIEW_ABOUT_YOU = 'review-about-you';


const baseUrl = (process.env.NODE_ENV === 'production')? '' : '//localhost:3030'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

window.socketService = socketService

// var socketIsReady = false;
socketService.setup()


function createSocketService() {
  var socket = null;
  const socketService = {
    async setup() {
      // YaronB: Need to send a dummy ajax request as to setup the socket-session correctly
      // await httpService.get('setup-session')
      // socket = io(baseUrl, { reconnection: false})
      socket = io(baseUrl)
      // socketIsReady = true;
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb=null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}


// Basic Tests
// function cb(x) {console.log(x)}
// socketService.on('baba', cb)
// socketService.emit('baba', 'DATA')
// socketService.off('baba', cb)

