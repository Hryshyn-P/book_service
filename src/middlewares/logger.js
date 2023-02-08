import { createWriteStream, existsSync, mkdirSync, readFile, writeFile } from "fs";
import moment from "moment/moment.js";
import morgan from 'morgan';
import { scheduleJob } from "node-schedule";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const logsFolder = 'logs';
if (!existsSync(logsFolder)) mkdirSync(logsFolder);

const __dirname = dirname(fileURLToPath(import.meta.url));
const logsDir = join(__dirname, `../../${logsFolder}`);
const logFilePath = join(logsDir, 'requests.log');
const accessLogStream = createWriteStream(logFilePath, { flags: 'a' });
const logger = morgan('combined', { stream: accessLogStream });

// Create a schedule job for logs cleaning
scheduleJob("0 0 */2 * *", () => { // launch every other day at midnight (00:00) according to the server's time zone.
  const cutoffTime = Date.now() -  24 * 60 * 60 * 1000; // delete logs older than 24 h
  const logFile = `${logsFolder}/requests.log`;

  readFile(logFile, 'utf8', (err, data) => {
      if (err) return console.error(err);
      const lines = data.trim().split('\n');

    const filteredLines = lines.filter((line) => {
      const dateString = line.match(/\[(.*?)\]/)?.[1];
      const logTime = moment(dateString, 'DD/MMM/YYYY:HH:mm:ss Z').valueOf();
      return logTime > cutoffTime;
    });

    const newContent = filteredLines.join('\n') + '\n';
    writeFile(logFile, newContent, 'utf8', (err) => {
      return err ? console.error(err) : console.log('Log cleaning is complete');
    });
  });
});

export default logger;
