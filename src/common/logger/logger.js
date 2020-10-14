const fs = require('fs');
const path = require('path');

const { colors } = require('../constants');

const writeToLogsFile = async (dataToWrite, pathToFile) => {
  fs.appendFile(
    pathToFile
      ? path.resolve(pathToFile)
      : path.resolve(__dirname, './logs.txt'),
    `${JSON.stringify(dataToWrite)}\n`,
    {
      encoding: 'utf8',
      flag: 'a+'
    },
    err => {
      if (err) {
        throw new Error(err);
      }
    }
  );
};

const logger = async (req, res, next) => {
  try {
    const { method, body, query, originalUrl } = req;
    const data = {
      date: new Date().toISOString(),
      method: method.toUpperCase(),
      url: originalUrl,
      query: Object.entries(query).length ? query : null,
      body: Object.entries(body).length ? body : null
    };

    await writeToLogsFile(data);
    next();
    return;
  } catch (error) {
    if (error) {
      console.error(`${colors.error}${error}${colors.normal}`);
      await writeToLogsFile(error);
      next();
      return;
    }
  }
};

module.exports = {
  logger
};
