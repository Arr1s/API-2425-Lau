import './index.css';

console.log('Hello, world!');






document.addEventListener("DOMContentLoaded", () => {
    const agentCards = document.querySelectorAll(".agentCard");
    const select = document.querySelector("select");

    select.onchange = () => { 
        const selectedMap = document.getElementById("chooseMap").value;
        const shownMap = document.getElementById("shownMap")
        console.log(selectedMap)
    
        if (selectedMap) {
            console.log("Ik ben gekozen")
            shownMap.src = `${selectedMap}`;
        } else {
            console.log("Ik ben niet gekozen")
        }
    }

    agentCards.forEach(card => {
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





// Create an image and then use it for the drag image.
// NOTE: change "example.gif" to a real image URL or the image
// will not be created and the default drag image will be used.
// let img = new Image();
// img.src = "example.gif";
// function dragstartHandler(ev) {
//   ev.dataTransfer.setDragImage(img, 10, 10);
// }
