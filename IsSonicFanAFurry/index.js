const Notxt = document.getElementById("No");

// Audio
const ominousAudio = new Audio("/assets/IHateYou.mp3");
let sequenceRunning = false;

// Sequential alerts helper
async function showAlerts(alerts) {
    for (const msg of alerts) {
        alert(msg);
        await new Promise(r => setTimeout(r, 100));
    }
}

// Main sequence
async function runSequence() {
    if (sequenceRunning) return;
    sequenceRunning = true;

    // Dark background
    document.body.classList.add("dark");

    // Tremble + smooth color transition to red
    Notxt.classList.add("tremble");

    // Float wrapper already exists
    Notxt.parentElement.classList.add("float-wrapper");

    // Play audio
    ominousAudio.play().catch(err => console.log("Audio blocked:", err));

    // Sequential messages
    const messages = [
        "So...",
        "You actually did it",
        "You actually changed the text",
        "...",
        "I am ashamed of you...",
        "You think this is the end?",
        "You're wrong",
        "This",
        "is",
        "not",
        "war",
        "...",
        "You know what",
        "Because of that typo",
        "Just...",
        "Go away"
    ];

    await showAlerts(messages);

    // Redirect
    window.location.href = "/My-website/index.html";
}

// Observe live changes to the <h1> text
const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
            const text = Notxt.textContent.toLowerCase();
            if (text !== "no" && !sequenceRunning) {
                runSequence();
            }
        }
    }
});

// Observe the <h1> and its subtree
observer.observe(Notxt, { childList: true, characterData: true, subtree: true });

// Optional click to toggle text for testing
Notxt.addEventListener("click", () => {
    Notxt.textContent = Notxt.textContent.toLowerCase() === "no" ? "Yes!" : "No.";

});
