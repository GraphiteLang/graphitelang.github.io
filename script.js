const features = [
    "feature/tuples", "feature/interfaces", "feature/structs", "feature/classes", "feature/actors", "feature/threads",
    "feature/coroutines", "feature/async", "feature/defer", "feature/c_ffi", "feature/nim_interop",
    "compiler/llvm", "compiler/gcc", "compiler/msvc", "compiler/fast", "compiler/lightweight",
    "memory/orc", "memory/arc", "memory/atomic_arc", "memory/refc", "memory/mark_sweep", "memory/boehm", "memory/ownership"
];

const importLine = document.getElementById("import-line");
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
        updateImportLine(toText.slice(0, i));
        await sleep(100);
    }
}

async function eraseText(fromText, toText) {
    const commonPrefix = getCommonPrefix(fromText, toText);
    for (let i = fromText.length; i > commonPrefix.length; i--) {
        updateImportLine(fromText.slice(0, i - 1));
        await sleep(75);
    }
    return commonPrefix;
}

function updateImportLine(feature) {
    const importLine = document.getElementById("import-line");
    importLine.innerHTML = `<span class="keyword">import</span> ${feature}`;
}

function getRandomFeatures(count) {
    const shuffled = features.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

async function showFeature(next) {
    const commonPrefix = await eraseText(current, next);
    await sleep(500);
    await typeText(commonPrefix, next);
    current = next;
}

async function loopFeatures() {
    const initial = getRandomFeatures(1)[0];
    await typeText("", initial);
    current = initial;

    while (true) {
        const batch = getRandomFeatures(4);
        for (const feature of batch) {
            await sleep(1500);
            await showFeature(feature);
        }
    }
}

loopFeatures();