import "./index.css";

console.log("Hello, world!");

const draggableAbilities = document.querySelectorAll(".ability");
const dropZone = document.getElementById("target");

let draggedItem = null;

if (draggableAbilities) {
  draggableAbilities.forEach((dragItem) => {
    dragItem.addEventListener("drag", dragstartHandler);
  });
}
if (dropZone) {
  dropZone.addEventListener("dragover", dragoverHandler);
  dropZone.addEventListener("drop", dropHandler);
}

function dragstartHandler(ev) {
  draggedItem = ev.target;

  ev.dataTransfer.effectAllowed = "move";
}

function dragoverHandler(ev) {
  ev.preventDefault();
  // ev.dataTransfer.dropEffect = "move";
  console.log("Dragging over drop zone");
}

function dropHandler(ev) {
  ev.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
//   console.log(data);

    const cloneDraggy = draggedItem.cloneNode(true)

    cloneDraggy.style.position = 'absolute'
    cloneDraggy.style.width = draggedItem.offsetWidth
    cloneDraggy.style.height =  draggedItem.offsetHeight
    cloneDraggy.style.top =  (ev.offsetY - 8) + 'px'
    cloneDraggy.style.left =  (ev.offsetX - 8) + 'px'

  dropZone.appendChild(cloneDraggy);
  draggedItem = null;
}

document.addEventListener("DOMContentLoaded", () => {
  const agentCards = document.querySelectorAll(".agentCard");
  const select = document.querySelector("select");

  select.onchange = () => {
    const selectedMap = document.getElementById("chooseMap").value;
    const shownMap = document.getElementById("shownMap");
    console.log(selectedMap);

    if (selectedMap) {
      console.log("Ik ben gekozen");
      shownMap.src = `${selectedMap}`;
    } else {
      console.log("Ik ben niet gekozen");
    }
  };

  agentCards.forEach((card) => {
    const abilities = card.querySelector(".abilities");
    abilities.style.display = "none";

    card.addEventListener("mouseover", () => {
      abilities.style.display = "flex";
    });

    card.addEventListener("mouseout", () => {
      abilities.style.display = "none";
    });
  });
});
