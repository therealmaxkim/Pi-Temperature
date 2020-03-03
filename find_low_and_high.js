const fs = require("fs");

//grab the date and filenames
var myArgs = process.argv.slice(2);
//console.log('myArgs: ', myArgs);
var date = myArgs[0];
var filename = myArgs[1];

//read the log file 
var logText = fs.readFileSync(filename, "utf8");
//console.log(logText)

//split by the comma delimiter that we put in between each temperature reading
logText = logText.split("\n");
//console.log(logText)



//convert each temeprature reading into a JSON object
logText.forEach(function(part, index) {
    this[index] = JSON.parse(this[index]);
}, logText);
//console.log(logText)


//filter by the JSON objects that share the same date 
logText = logText.filter(reading => reading['time'] === date);
//console.log(logText)

//function that will take a JSON object and return the temperature number. 
function get_temperature(a) {
    var temp = a['msg'].split(',')[0];                               //temp: 24.899999618530273°C
    var no_ending = temp.substring(0, temp.length-2);                   //temp: 24.899999618530273
    var number = parseFloat(no_ending.substring(6, no_ending.length));  //24.899999618530273
    return number;
}

//sort the remaining readings by their temperature. Lowest to highest.
logText.sort(function(a, b) {
    return get_temperature(a) - get_temperature(b);
});

//console.log(logText)

//Find lowest and highest temperatures. If no temperatures, set default values
var low = 'Does not exist';
var high = 'Does not exist';
if (logText.length > 0) {
    low = get_temperature(logText[0]);
    high = get_temperature(logText[logText.length-1]);
}

//print out the results
console.log(`The lowest temperature was: ${low} °C`);
console.log(`The highest temperature was: ${high} °C`);