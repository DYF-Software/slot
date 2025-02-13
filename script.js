const symbols = ["🍒", "🍋", "🍉", "⭐", "🔔", "7️⃣"];
const spinButton = document.getElementById("spin");
const reels = document.querySelectorAll(".reel");
const totalSymbols = 20;

function getRandomSymbols() {
  let randomSymbols = [];
  for (let i = 0; i < totalSymbols; i++) {
    randomSymbols.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }
  return randomSymbols;
}

function createReelContent(reel) {
  reel.innerHTML = "";
  let items = getRandomSymbols();
  items.forEach(symbol => {
    let slotDiv = document.createElement("div");
    slotDiv.classList.add("slot");
    slotDiv.innerText = symbol;
    reel.appendChild(slotDiv);
  });
}

function setupReels() {
  reels.forEach(reel => createReelContent(reel));
}

function spinReels() {
  if (spinButton.disabled) return;
  spinButton.disabled = true;

  reels.forEach((reel) => {
    reel.style.transition = "none";
    reel.style.transform = "translateY(0)";
    createReelContent(reel);
  });

  void reels[0].offsetHeight;

  let completedReels = 0;
  reels.forEach((reel) => {
    let moveDuration = Math.random() * 2 + 3;
    let totalHeight = reel.scrollHeight;

    reel.style.transition = `transform ${moveDuration}s ease-out`;
    reel.style.transform = `translateY(-${totalHeight / 2}px)`;

    reel.addEventListener("transitionend", function onEnd() {
      reel.removeEventListener("transitionend", onEnd);

      completedReels++;
      if (completedReels === reels.length) {
        spinButton.disabled = false;
        checkWin();
      }
    }, { once: true });
  });
}

function checkWin() {
  const results = Array.from(reels).map((reel) => {
    return reel.children[15].innerText;
  });

  if (results[0] === results[1] && results[1] === results[2]) {
    alert("Kazandınız! 🎉");
  } else {
    alert("Kaybettiniz! 😢");
  }
}

setupReels();
spinButton.addEventListener("click", spinReels);
