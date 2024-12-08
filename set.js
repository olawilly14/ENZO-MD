const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0tLdDhUQzZCYm05MlNQa3Z3TTkvaUNLV0JRekF1S29Mak1ZV0R6elJuND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2gxenFtSlo3TTlmazVYblFQNGQrM1gwZmJ0TDYzYUp1cExvSlEzWjdpST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzSFh4MjVadXRtNTBtclB0UUErZ042L2NSa0JEUG1xUk9kYVovTDB6UW1zPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3UU1URC9KTEVab0pqcjh0S2k5NkgxVUF4L1dicGVrcUU1amNhTzZjWWg4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndObnJSVlN2SEhZVG1YSUdRb0dxbW9Qb3VOVHFXQktPMS9SMGtJN2FlbUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlNb1dZaDZkaHBWQlFCNFJVbDJiSDFPVFh5anM1NnFwOUhnRkxKeW1maUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkN6UjZNSGNCVTU5NWFsQ2I5Q09mNU05cnJCbjJuSlJnSUZqb3d0ZEVXWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmU2c2RZeWZzS2lqWm1wQXVnSGJoWlBweUs1ZU4vT1I3bVU2OWtTb0dVND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InREWG93L3Rhb24rRUhCYUJyeE92cEx2R00zU1JYWUNkZ2Q0MVpFVnc4cGdua3U3MGNJZ1J0enlaeCtPZEdGZW16b2Y5bThYY3Blc0VONGRKaTltL0R3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAwLCJhZHZTZWNyZXRLZXkiOiIyOFpCOFAweE1ZM3liMTluK1JlODJmZ1U5RUJTRTgva3NZUUVrVXh5SDI0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJKakNaejh4dVIwcXhzWUU0WlR0bVhBIiwicGhvbmVJZCI6ImM3OTQ5ZDAwLWQ0ZDgtNDU0NS1hYzA0LTIxOTA0ODIxMTYyNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrOE9XNVNGK2NHbGVkN0U2czVjV2p1MGllQ3M9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic2gveEhFQ1Q0VHdQQ0E2TUxscFcxbXh1NnpFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRZSEZCNzM0IiwibWUiOnsiaWQiOiIyMzQ3MDgxNDE0Mjk0OjE5QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJckI4NzhCRU9YRjE3b0dHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI3ZlhSNHcwYlR5RzYwVDVIb1N2MEVHZkdjOWRjaDlHOVM3UWRUdmlOL1NJPSIsImFjY291bnRTaWduYXR1cmUiOiJkN0VjN2l3bnEvRS9HV0xva291bFpSeEJnTVZqblJkZEpjc2ZLUWE5WVVXb2VSa2hYZUljOE5lNERPSkV5WURDUlZPaWszSW5MWTJjVTliY3J3Q2JDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNG11TXpNc2ljTXJFNHFFNStILzlHc0tEQmVmK1pRL28yT3Z2N1Z2ZkZIWlp0LzR3VW1CZ3Y3NXRHZXdLY01sbGxsL28ya25UTFRveitJRGFBVHFTRFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDgxNDE0Mjk0OjE5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmUzMTBlTU5HMDhodXRFK1I2RXI5QkJueG5QWFhJZlJ2VXUwSFU3NGpmMGkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzM2ODE5MDYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRDMxIn0=',
    PREFIXE: process.env.PREFIX || "/",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
