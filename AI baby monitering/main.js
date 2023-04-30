img = "";
status = "";
objects = [];
song = "";

function preload()
{
    song = loadSound("i_believe_i_can_fly.mp3");                     
}

function setup()
{
    canvas = createCanvas(420,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(420,400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Dectecting";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results
}

function draw()
{
    image(video,0,0,420,400);
    
    if(status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are:" + objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent +"%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height ); 
            if(objects[i].label == "person")
            {
                document.getElementById("status").innerHTML = "Baby is Found";
                song.stop();
            }
            else{
                document.getElementById("status").innerHTML = "Baby is Not Found";
                song.play();
            }
            if(objects.length == 0)
            {
                document.getElementById("status").innerHTML = "Baby is Not Found";
                song.play();
            }
        
        }
    }
}

