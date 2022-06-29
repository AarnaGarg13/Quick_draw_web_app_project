quick_draw_list = ["clock" , "apple" , "circle" , "heart" , "rectangle" , "bow"]
random_number = Math.floor(Math.random()*6)
sketch = quick_draw_list[random_number]
document.getElementById("draw_sketch").innerHTML = sketch;

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;

function preload()
{
    classifier = ml5.imageClassifier('DoodleNet')
}
function setup()
{
    canvas = createCanvas(400 , 400)
    canvas.center()
    background("white")
    canvas.mouseReleased(classifyCanvas)
}
function classifyCanvas()
{
    classifier.classify(canvas , gotResults)
}

function gotResults(error , results)
{
    if(error)
    {
        console.error(error)
    }
    else
    {
        console.log(results)
        drawn_sketch = results[0].label
        document.getElementById("sketch_answer").innerHTML = results[0].label
        document.getElementById("confidence_answer").innerHTML = results[0].confidence.toFixed(2)
    }
}

function draw()
{
    strokeWeight(13)
    stroke("black")
    if(mouseIsPressed)
    {
        line(pmouseX , pmouseY , mouseX , mouseY)
    }
    check_sketch();
    if(drawn_sketch  == sketch)
    {
        answer_holder = "set"
        score++
        document.getElementById("score_answer").innerHTML = score;
    }
}

function clearCanvas()
{
    background("white")
}
function check_sketch()
{
    timer_counter++;
    document.getElementById("timer_answer").innerHTML = timer_counter
    if(timer_counter > 600)
    {
        timer_counter = 0
        timer_check = "completed";
    }
    if(timer_check == "completed"|| answer_holder == "set")
    {
        timer_check = "";
        answer_holder = "";
        update_canvas();
    }
}
function update_canvas()
{
    background("white")
    random_number = Math.floor(Math.random()*6)
    sketch = quick_draw_list[random_number]
    document.getElementById("draw_sketch").innerHTML = sketch;
}