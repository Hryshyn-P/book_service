import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// set path
const logsFolder = "test";
const __dirname = dirname(fileURLToPath(import.meta.url));
const logsDir = join(__dirname, `/${logsFolder}`);
let logFilePath = join(logsDir, "test.txt");

// run async IIFE
(async () => {
  try {
    // make directory
    await new Promise((resolve, reject) => {
      fs.mkdir(logsDir, { recursive: true }, (err) => {
        if (err) reject(err);
        else {
          console.log("Directory created successfully!");
          resolve();
        }
      });
    });

    // write file
    await new Promise((resolve, reject) => {
      fs.writeFile(logFilePath, "Hello, world!\n", (err) => {
        if (err) reject(err);
        else {
          console.log("File has been written.");
          resolve();
        }
      });
    });

    // append to file
    await new Promise((resolve, reject) => {
      fs.appendFile(logFilePath, "New data.......\n", (err) => {
        if (err) reject(err);
        else {
          console.log("File has been updated.");
          resolve();
        }
      });
    });

    // read file
    const data = await new Promise((resolve, reject) => {
      fs.readFile(logFilePath, "utf-8", (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
    console.log(data);

    // copy file
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        fs.copyFile(logFilePath, `${logFilePath.slice(0, -4)}_2.txt`, (err) => {
          if (err) reject(err);
          else {
            console.log("File copied successfully!");
            resolve();
          }
        });
      }, 3000);
    });

    // rename file
    await new Promise((resolve, reject) => {
      fs.rename(
        logFilePath,
        `${logFilePath.slice(0, -4)}_renamed.txt`,
        (err) => {
          if (err) reject(err);
          else {
            console.log("File renamed successfully!");
            logFilePath = `${logFilePath.slice(0, -4)}_renamed.txt`;
            resolve();
          }
        }
      );
    });

    // get info about file
    const stats = await new Promise((resolve, reject) => {
      fs.stat(logFilePath, (err, stats) => {
        if (err) reject(err);
        else resolve(stats);
      });
    });
    console.log(`File size: ${stats.size} bytes`);
    console.log(`Is directory: ${stats.isDirectory()}`);
    console.log(`Is file: ${stats.isFile()}`);

    // delete file
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        fs.unlink(logFilePath, (err) => {
          if (err) {
            reject(err);
            return;
          }
          console.log("File deleted successfully!");
          resolve();
        });
      }, 3000);
    });
    
  } catch (err) {
    console.error(err);
  }
})();
