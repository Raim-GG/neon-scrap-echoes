// game.js

// Game State Management
let gameState = {
    upgrades: [],
    passiveIncome: 0,
    clickCount: 0,
    lockedNodes: [],
    currentMenu: 'main'
};

// Upgrade Tree System
const upgradeTree = [
    // Define upgrades according to GDD
    { id: 1, name: 'Upgrade 1', cost: 100, effect: () => { gameState.passiveIncome += 10; }},
    // More upgrades...
];

function applyUpgrade(upgradeId) {
    const upgrade = upgradeTree.find(up => up.id === upgradeId);
    if (upgrade && gameState.clickCount >= upgrade.cost) {
        gameState.clickCount -= upgrade.cost;
        upgrade.effect();
        gameState.upgrades.push(upgrade);
    }
}

// Passive Income Calculation
function calculatePassiveIncome() {
    gameState.clickCount += gameState.passiveIncome;
}

// Click Handling
function handleClick() {
    gameState.clickCount++;
}

// Node Locking/Unlocking System
function lockNode(nodeId) {
    gameState.lockedNodes.push(nodeId);
}

function unlockNode(nodeId) {
    gameState.lockedNodes = gameState.lockedNodes.filter(id => id !== nodeId);
}

// Menu Tab Switching
function switchMenu(menu) {
    gameState.currentMenu = menu;
}

// Modal Interactions
function openModal(modalId) {
    // Logic to display modal
}

function closeModal(modalId) {
    // Logic to hide modal
}

// Animations
function animateElement(elementId, animationName) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add(animationName);
        // Remove animation class after animation ends
        element.addEventListener('animationend', () => {
            element.classList.remove(animationName);
        }, { once: true });
    }
}

// Exporting the game state for further use
export { gameState, applyUpgrade, calculatePassiveIncome, handleClick, lockNode, unlockNode, switchMenu, openModal, closeModal, animateElement };