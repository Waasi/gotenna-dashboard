const Message = require('../models/message');

const baseURL = process.env.BASE_URL;

function MessagesControllers(router) {
  router.get("/", (request, response) => {
    const filter = request.query.type ? { type: request.query.type } : {}

    try {
      const messages = Message.all(filter);

      response.render('dashboard', {
        baseURL,
        messages,
        title: 'GoTenacious Mesh Dashboard'
      });
    } catch (error) {
      response
        .status(500)      
        .json({ error });
    }
  });

  router.post("/messages", (request, response) => {
    const params = request.body;

    try {
      const message = Message.create(params);

      response
        .status(200)
        .json({ message });
    } catch (error) {
      response
        .status(500)
        .json({ error: 'internal server error' });
    }
  });

  return router;
}

module.exports = MessagesControllers;