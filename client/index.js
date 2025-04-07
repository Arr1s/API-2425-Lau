import "./index.css";

console.log("Hello, world!");

const draggableAbilities = document.querySelectorAll(".ability");
const dropZone = document.getElementById("target");

let draggedItem = null;
let cloneDraggy = null

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

    cloneDraggy = draggedItem.cloneNode(true)
    cloneDraggy.classList.add("clonedraggy");

    cloneDraggy.style.position = 'absolute'
    cloneDraggy.style.width = draggedItem.offsetWidth
    cloneDraggy.style.height =  draggedItem.offsetHeight
    cloneDraggy.style.top =  (ev.offsetY - 8) + 'px'
    cloneDraggy.style.left =  (ev.offsetX - 8) + 'px'

  dropZone.appendChild(cloneDraggy);
  draggedItem = null;
  console.log(cloneDraggy)
}



const clearButton = document.getElementById("clearAbilities");

if (clearButton) {
  clearButton.addEventListener("click", () => {
    const clones = document.querySelectorAll(".clonedraggy");
    clones.forEach((clone) => clone.remove());
  });
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
  
    // abilities en abilityName in eerste instantie verbergen
    abilities.style.display = "none";
  
    const abilityElements = abilities.querySelectorAll(".ability");
  
    abilityElements.forEach((ability) => {
      const abilityName = ability.querySelector(".abilityName");
      if (abilityName) {
        abilityName.style.visibility = "hidden"; // verberg standaard
  
        ability.addEventListener("mouseenter", () => {
          abilityName.style.visibility = "visible"; // maak zichtbaar
        });
  
        ability.addEventListener("mouseleave", () => {
          abilityName.style.visibility = "hidden";
        });
      }
    });
  
    card.addEventListener("mouseenter", () => {
      abilities.style.display = "flex";
    });
  
    card.addEventListener("mouseleave", () => {
      abilities.style.display = "none";
  
      // Verberg ook alle abilityNames wanneer je weggaat van de hele kaart
      abilityElements.forEach((ability) => {
        const abilityName = ability.querySelector(".abilityName");
        if (abilityName) {
          abilityName.style.visibility = "hidden";
        }
      });
    });
  });
  
  


  select.onchange();
});


