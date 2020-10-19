const { PORT } = require('./common/config');
const app = require('./app');
const {
  promiseRejectHandler,
  uncoughtExceptionHandler
} = require('./common/logger/logger');

process
  .on('unhandledRejection', promiseRejectHandler)
  .on('uncaughtException', uncoughtExceptionHandler);

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
