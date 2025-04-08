console.log("drag.js loaded");

const draggableAbilities = document.querySelectorAll(".ability");
const draggableAgentIcon = document.querySelectorAll(".agentIcon");
const dropZone = document.getElementById("target");

let draggedItem = null;
let cloneDraggy = null

if (draggableAbilities) {
  draggableAbilities.forEach((dragItem) => {
    dragItem.addEventListener("drag", dragstartHandler);
  });
}
if (draggableAgentIcon) {
  draggableAgentIcon.forEach((dragItem) => {
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
}

function dropHandler(ev) {
  ev.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  if (draggedItem.classList.contains("clonedraggy")) {
    // Verplaats bestaande clone
    draggedItem.style.top = (ev.offsetY - 15) + 'px';
    draggedItem.style.left = (ev.offsetX - 15) + 'px';
    console.log(cloneDraggy.style.top);
    console.log(cloneDraggy.style.left);
  } else {
    // Maak een nieuwe clone
    cloneDraggy = draggedItem.cloneNode(true);
    cloneDraggy.classList.add("clonedraggy");
    cloneDraggy.setAttribute("draggable", true);
    cloneDraggy.addEventListener("dragstart", dragstartHandler);

    cloneDraggy.style.position = 'absolute';
    cloneDraggy.style.width = draggedItem.offsetWidth + 'px';
    cloneDraggy.style.height = draggedItem.offsetHeight + 'px';
    cloneDraggy.style.top = (ev.offsetY - 15) + 'px';
    cloneDraggy.style.left = (ev.offsetX - 15) + 'px';

    dropZone.appendChild(cloneDraggy);
    console.log(cloneDraggy.style.top);
    console.log(cloneDraggy.style.left);
  }

  draggedItem = null;
}

const clearButton = document.getElementById("clearAbilities");

if (clearButton) {
  clearButton.addEventListener("click", () => {
    const clones = document.querySelectorAll(".clonedraggy");
    clones.forEach((clone) => clone.remove());
  });
}