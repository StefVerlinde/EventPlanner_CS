const express = require("express");
const cors = require("cors");
const api = express();
const moment = require('moment-timezone');
const port = 5000;

const corsoptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type"]
};

//Middelware
//parses incoming requests with JSON payloads
api.use(express.json());
api.use(cors(corsoptions));
//parses incoming requests with urlencoded payloads
api.use(
  express.urlencoded({
    extended: true,
  })
);

/**
 * post methode for calculating time in new timezone and removing "je" from name input
 * @returns name without "je", new calculated timezone 
 */
api.post("/timecalc", ({body: {name, date, time, timezone, newTimezone}}, resp) => {
  var m = moment.tz(`${date} ${time}`, `${timezone}`);
  // var regex = /(t|k|p|et)?je/g
  var words = name.split(" ");
  words = words.map((woord) => {
    // return woord.replace(regex, '');
    if(woord.length <= 2) return woord;
    if(woord.endsWith("je")) return woord.slice(0, -2);
    return woord
  })
  words = words.join(" ")
  resp.send({
    name: words,
    timezone: timezone,
    newTimezone: newTimezone,
    newDate: m.tz(`${newTimezone}`).format('YYYY-MM-DD HH:mm:ss'),
  });
});

api.listen(port, (err) => {
  if (err) throw new Error(err);
  else console.log(`api listening at localhost:${port}`);
});
