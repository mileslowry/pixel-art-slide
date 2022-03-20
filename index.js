const IMG_PANEL = document.querySelector('#img-panel');
const TEXT_PANEL = document.querySelector('#text-panel');
const PANEL_IMG = document.querySelector('#panel-img');
const NEXT = document.querySelector('#next-btn');
const PREVIOUS = document.querySelector('#prev-btn');
let PANEL_COUNT = 0;
let PARSED_SCRIPT = {};
let COMPLETED = {};
let SUB_INDEX = 0;


// TODO: Simplify
const nextPanel = () => {
    let newIndex;
    let currentIndex = parseInt(IMG_PANEL.dataset.index);
    if (PARSED_SCRIPT[currentIndex]) {
        if (COMPLETED[currentIndex] === PARSED_SCRIPT[currentIndex].length) {
            SUB_INDEX = 0;
            if (currentIndex + 1 > PANEL_COUNT) {
                newIndex = 1
                for (i=1; i<=PANEL_COUNT; i++) {
                    COMPLETED[i] = 0;
                }
            } else {
                newIndex = currentIndex + 1
            }
            IMG_PANEL.dataset.index = newIndex;
            PANEL_IMG.src = `panels/${newIndex}.png`;
            TEXT_PANEL.innerHTML = "";
            TEXT_PANEL.innerHTML = `<p>${PARSED_SCRIPT[newIndex][SUB_INDEX]}</p>`;
            COMPLETED[newIndex] += 1;
        } else {
            if (PARSED_SCRIPT[currentIndex].length > 1) {
                SUB_INDEX += 1;
            } else {
                SUB_INDEX = 0
            }
            PANEL_IMG.src = `panels/${currentIndex}.png`;
            TEXT_PANEL.innerHTML = "";
            TEXT_PANEL.innerHTML = `<p>${PARSED_SCRIPT[currentIndex][SUB_INDEX]}</p>`
            COMPLETED[currentIndex] += 1;
        }
    }
}


const parseScript = () => {
    fetch('story/script.txt')
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            let currentPanels = [];
            let dividerCount = 0;
            let lineArray = data.split("\n");
            lineArray.forEach((line) => {
                if (line.trim().length > 0) {
                    if (line.startsWith("PANEL_COUNT:")) {
                        PANEL_COUNT = parseInt(line.trim().split(":")[1]);
                        for (i=1;i<=PANEL_COUNT;i++) {
                            PARSED_SCRIPT[i] = []
                            COMPLETED[i] = 0;
                        }
                    } else if (line.trim() === "---") {
                        dividerCount += 1;
                    } else {
                        if (dividerCount % 2 === 0) {
                            currentPanels.forEach((current) => {
                                PARSED_SCRIPT[current].push(line.replace("\r", ""));
                            })
                        } else {
                            currentPanels = []
                            let tempArray = line.trim().split(" & ")
                            tempArray.forEach((temp) => {
                                currentPanels.push(parseInt(temp));
                            })
                        }
                    }
                }
            });
            return PARSED_SCRIPT;
        })
}


(NEXT).addEventListener("click", nextPanel);


parseScript();