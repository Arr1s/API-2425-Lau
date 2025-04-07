console.log("abilities.js loaded");

const agentCards = document.querySelectorAll(".agentCard");
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