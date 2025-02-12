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
    spinButton.disabled = true;
    
    reels.forEach((reel, index) => {
        let moveDuration = Math.random() * 2 + 3;
        let totalHeight = reel.scrollHeight;

        reel.style.transition = `transform ${moveDuration}s ease-out`;
        reel.style.transform = `translateY(-${totalHeight / 2}px)`;
    });

    setTimeout(() => {
        spinButton.disabled = false;
        checkWin();
    }, 5000);
}

function checkWin() {
    const results = Array.from(reels).map(reel => reel.children[totalSymbols / 2].innerText);
    if (results[0] === results[1] && results[1] === results[2]) {
        setTimeout(() => alert("Kazandınız! 🎉"), 300);
    }
    else
        setTimeout(() => alert("Kaybettiniz! 😢"), 300);
}

setupReels();
spinButton.addEventListener("click", spinReels);
