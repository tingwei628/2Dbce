let cancelId = "";
function start()
{
  let i = 0;
  cancelId = setInterval(function()
  {
    let balls = ["O  ", " O ", "  O", " O "];
    //console.clear();
    process.stdout.write("\u001b[2J\u001b[0;0H");
    //process.stdout.write("\r")
    process.stdout.write(balls[i]);
 
    
    // 1,2,3,2,1
    i = (i+1) % 4;
  }, 100);
}
start();

// setTimeout(() => {
//   clearInterval(loader);
// }, 5000);
