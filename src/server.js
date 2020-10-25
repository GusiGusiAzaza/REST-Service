const { PORT } = require('./common/config');
const mongoConnect = require('./db/mongo-connect');
const app = require('./app');

mongoConnect()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );
  })
  .catch(() => {
    console.error('mongoDB connection error');
  });
