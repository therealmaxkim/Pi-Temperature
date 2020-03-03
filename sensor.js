const sensor = require("node-dht-sensor").promises;
const bunyan = require("bunyan");
sensor.setMaxRetries(10);
const log = bunyan.createLogger({
    name: "dht",
    streams: [
        {
            path: "./dhtsensor.log",
            level: "debug"
        },
        {
            path: "/var/tmp/dhtsensorError.log",
            level: "error"
        }
    ]
});

setInterval(async () => {
    try {
        const reading = await sensor.read(22, 4);
        const temp = reading.temperature;
        const humi = reading.humidity;
        log.info(`temp: ${temp}°C, humidity: ${humi}%,`); //JSON.stringify property of temp holding temp. etc
//maybe log a json object, check bunyan
        
    } catch (e) {
        log.error("Error!");
        log.error(e);
    }
},1000);

console.log("Starting node sensor script");
