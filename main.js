img = "";
status = "";
objects=[];
function preload()
{
    img = loadImage('dog_cat.jpg');
}
function setup()
{
    canvas = createCanvas(640, 400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

}
function modelLoaded()
{
    console.log('Model Loaded!');
    objectDetector.detect(img, gotResults);    
    document.getElementById('status').innerHTML = "Status: Detecting objects";
}
function gotResults(error, results)
{
   if(error)
   {
       console.log(error);
   }else{
       console.log(results);
       objects = results;
       status = true;
   }
}
function draw()
{
    image(img, 0, 0, 640, 400);    
    if(status != "")
    {
      for(i=0; i <= objects.length; i++)
       {        
        textSize(18);
        document.getElementById("status").innerHTML = "Status : Objects Detetcted";
        fill('red');
        percent = floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y + 15);
        noFill();
        stroke('red');
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       } 
    }        
}
