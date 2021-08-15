let onoff = require('onoff');

let Gpio = onoff.Gpio,
    led = new Gpio(4,'out'),
    interval;



interval = setInterval(function(){
      let value = (led.readSync() +1)%2; 
      led.write(value, function(){
            console.log("Changed LED state to:" + value);       
 
      });
},2000);


process.on("SIGINT", function(){  //
    clearInterval(interval);
    led.writeSync(0);
    led.unexport();
    console.log("Bye, bye");
    process.exit();
});