import root from './modules/root.js'

let canvas;
let stage;
let fpsLabel;

export function initialize() {
    // create a new stage and point it at our canvas:
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    createjs.Touch.enable(stage);

    // add a text object to output the current FPS :
    fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#000");
    stage.addChild(fpsLabel);
    fpsLabel.x = 20;
    fpsLabel.y = 20;

    // start the tick and point it at the window so we can do some work before updating the stage:
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick", tick);

    root(stage);
}

function tick() {
    fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
    stage.update();
}

window.addEventListener('canvasLoaded', initialize);