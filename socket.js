let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer,{
        cors:{
            origin: 'https://apitherapy-production.up.railway.app'
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
