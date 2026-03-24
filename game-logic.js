// Neon Scrap Echoes - Complete Game Logic

class NeonScrapEchoes {
    constructor() {
        this.scrap = 0;
        this.perClick = 1;
        this.perSecond = 0;
        this.upgrades = new Set();
        this.totalScrapGenerated = 0;
        
        this.upgradeCatalog = {
            'bucket-mk1': {
                name: 'Ковш Mk.I',
                cost: 50,
                icon: '▣',
                perClickBonus: 5,
                category: 'body'
            },
            'pneumatic-mk1': {
                name: 'Пневмокулак Mk.I',
                cost: 200,
                icon: '!',
                perClickBonus: 20,
                category: 'body'
            },
            'armor-avialoma': {
                name: 'Броня из Авиалома',
                cost: 500,
                icon: '#',
                perSecondBonus: 5,
                category: 'armor'
            },
            'defragmentation': {
                name: 'Дефрагментация',
                cost: 150,
                icon: '>',
                perSecondBonus: 3,
                category: 'processor'
            },
            'ultrasonic': {
                name: 'Ультразвуковой сканер',
                cost: 300,
                icon: '()',
                perClickBonus: 15,
                category: 'sensor'
            },
            'neural-network': {
                name: 'Нейронная сеть',
                cost: 1000,
                icon: '⟡',
                perClickBonus: 50,
                perSecondBonus: 10,
                category: 'processor'
            }
        };

        this.initializeGame();
    }

    initializeGame() {
        setInterval(() => this.addPassiveIncome(), 100);
        document.getElementById('click-button')?.addEventListener('click', () => this.click());
        
        Object.keys(this.upgradeCatalog).forEach(upgradeId => {
            document.getElementById(`upgrade-${upgradeId}`)?.addEventListener('click', () => {
                this.purchaseUpgrade(upgradeId);
            });
        });

        this.updateDisplay();
    }

    click() {
        this.scrap += this.perClick;
        this.totalScrapGenerated += this.perClick;
        this.updateDisplay();
    }

    addPassiveIncome() {
        const income = this.perSecond / 10;
        this.scrap += income;
        this.totalScrapGenerated += income;
        this.updateDisplay();
    }

    purchaseUpgrade(upgradeId) {
        const upgrade = this.upgradeCatalog[upgradeId];
        
        if (!upgrade) {
            console.error(`Upgrade ${upgradeId} not found`);
            return;
        }

        if (this.upgrades.has(upgradeId)) {
            alert('Этот модуль уже установлен!');
            return;
        }

        if (this.scrap < upgrade.cost) {
            alert('Недостаточно скрапа!');
            return;
        }

        this.scrap -= upgrade.cost;
        this.upgrades.add(upgradeId);

        if (upgrade.perClickBonus) {
            this.perClick += upgrade.perClickBonus;
        }
        if (upgrade.perSecondBonus) {
            this.perSecond += upgrade.perSecondBonus;
        }

        this.updateDisplay();
        this.markUpgradeAsPurchased(upgradeId);
    }

    updateDisplay() {
        const scrapEl = document.getElementById('scrap-amount');
        const perClickEl = document.getElementById('per-click-amount');
        const perSecondEl = document.getElementById('per-second-amount');

        if (scrapEl) scrapEl.textContent = Math.floor(this.scrap);
        if (perClickEl) perClickEl.textContent = this.perClick;
        if (perSecondEl) perSecondEl.textContent = this.perSecond.toFixed(2);
    }

    markUpgradeAsPurchased(upgradeId) {
        const upgradeEl = document.getElementById(`upgrade-${upgradeId}`);
        if (upgradeEl) {
            upgradeEl.classList.add('purchased');
            upgradeEl.disabled = true;
            upgradeEl.textContent = '✓ Установлено';
        }
    }

    getUpgradeInfo(upgradeId) {
        return this.upgradeCatalog[upgradeId];
    }

    getSaveData() {
        return {
            scrap: this.scrap,
            perClick: this.perClick,
            perSecond: this.perSecond,
            upgrades: Array.from(this.upgrades),
            totalScrapGenerated: this.totalScrapGenerated
        };
    }

    loadSaveData(data) {
        if (!data) return;
        
        this.scrap = data.scrap || 0;
        this.perClick = data.perClick || 1;
        this.perSecond = data.perSecond || 0;
        this.totalScrapGenerated = data.totalScrapGenerated || 0;
        
        if (data.upgrades) {
            data.upgrades.forEach(upgradeId => {
                this.upgrades.add(upgradeId);
                this.markUpgradeAsPurchased(upgradeId);
            });
        }

        this.updateDisplay();
    }
}

let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new NeonScrapEchoes();
    
    const savedData = localStorage.getItem('neonScrapEchoesSave');
    if (savedData) {
        game.loadSaveData(JSON.parse(savedData));
    }

    setInterval(() => {
        localStorage.setItem('neonScrapEchoesSave', JSON.stringify(game.getSaveData()));
    }, 5000);
});