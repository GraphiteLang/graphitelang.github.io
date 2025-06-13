const features = [
    "Feature: Tuples...",
    "Feature: Interfaces...",
    "Feature: Structs...",
    "Feature: Classes...",
    "Feature: Actors...",
    "Feature: Threads...",
    "Feature: Coroutines...",
    "Feature: Async...",
    "Feature: Defer...",
    "Feature: C FFI...",
    "Feature: Nim Interop...",
    "Compiler: LLVM...",
    "Compiler: GCC...",
    "Compiler: MSVC...",
    "Compiler: Fast...",
    "Compiler: Lightweight...",
    "Memory: ORC...",
    "Memory: ARC...",
    "Memory: Atomic ARC...",
    "Memory: RefC...",
    "Memory: Mark&Sweep...",
    "Memory: Boehm...",
    "Memory: Ownership..."
];

const COMING_SOON = "Coming Soon...";
const targetElement = document.querySelector('code');
const cursor = document.querySelector('.blinking-cursor');
let current = "";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getCommonPrefix(a, b) {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) {
        i++;
    }
    return a.slice(0, i);
}

async function typeText(fromText, toText) {
    for (let i = fromText.length; i <= toText.length; i++) {
        updateCode(toText.slice(0, i));
        await sleep(100);
    }
}

async function eraseText(fromText, toText) {
    const commonPrefix = getCommonPrefix(fromText, toText);
    for (let i = fromText.length; i > commonPrefix.length; i--) {
        updateCode(fromText.slice(0, i - 1));
        await sleep(75);
    }
    return commonPrefix;
}

function updateCode(text) {
    targetElement.childNodes[0].nodeValue = "// " + text;
}

function getRandomFeatures(count) {
    const shuffled = features.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

async function showFeature(next) {
    const commonPrefix = await eraseText(current, next);
    await sleep(current === COMING_SOON ? 1500 : 500);
    await typeText(commonPrefix, next);
    current = next;
}

async function loopFeatures() {
    updateCode(""); // Clear initially
    const initial = getRandomFeatures(1)[0];
    await typeText("", initial);
    current = initial;

    while (true) {
        const batch = getRandomFeatures(4);
        for (const feature of batch) {
            await sleep(1500);
            await showFeature(feature);
        }

        // Show "Coming Soon..." at end of batch
        await sleep(1500);
        await showFeature(COMING_SOON);
    }
}

// Initialize the nodeValue of the code block
const initialText = document.createTextNode("");
targetElement.insertBefore(initialText, cursor);

// Start the typing loop
loopFeatures();