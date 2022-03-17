import Polygon from './polygon.js';
import ClickArea from './clickArea.js';
import ducuing from '../json/ducuing.json' assert { type: "json" };
import dubie from '../json/dubie.json' assert { type: "json" };
import poirot from '../json/poirot.json' assert { type: "json" };
import woki from '../json/woki.json' assert { type: "json" };
//import ducuing from '../json/ducuing.json';

let polygons = [];
let characters = [ducuing, poirot, dubie, woki];
let indexCharacter = 0;
let size = 30;
let marginX = 275;
let marginY = 100;

/*let marginX = 412;
let marginY = 200;*/

export default function root(stage) {
    let container = new createjs.MovieClip();
    stage.addChild(container);
    stage.polygons = polygons;

    characters[0].default.map((shape) => {
        let polygon = new Polygon(shape, stage);
        polygons.push(polygon);
        container.addChild(polygon);
    })

    let clickArea = new ClickArea();
    stage.addChild(clickArea);

    stage.on('changeCharacter', (e) => {
        changeCharacter(e, stage, container);
    })
}

function changeCharacter(e, stage, container) {
    indexCharacter++;
    if (indexCharacter >= characters.length) indexCharacter = 0;

    let nextCharacter = characters[indexCharacter];
    stage.polygons.map((polygon, index) => {
        if (index >= nextCharacter.default.length) return;
        polygon.coords = polygon.projectedCoords = nextCharacter.default[index].coords;
        polygon.color = nextCharacter.default[index].color;
    })

    if (stage.polygons.length > nextCharacter.default.length) {
        for (let i = nextCharacter.default.length; i <= stage.polygons.length; i++) {
            let polygon = stage.polygons[i];
            container.removeChild(polygon);
        }
        stage.polygons.splice(nextCharacter.default.length);
    } else if (stage.polygons.length < nextCharacter.default.length) {
        for (let i = stage.polygons.length; i < nextCharacter.default.length; i++) {
            let polygon = new Polygon(nextCharacter.default[i], stage, true);
            stage.polygons.push(polygon);
            container.addChild(polygon);
        }
    }
}