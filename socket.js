let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer,{
        cors:{
            origin: 'http://localhost:5173'
        }
    });

    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket is not initialized!");
    }
    return io;
  },
};
