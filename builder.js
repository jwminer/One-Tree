/**
 * UNA ARBOR BUILDER ENGINE
 * 
 * This file contains all the rendering functions that convert tree data
 * into HTML elements. It acts as the "view layer" of the application.
 * 
 * Main Functions:
 * - buildTreeHeader(): Creates the hero section with tree image and info
 * - buildIdentificationSection(): Creates the leaf/bark/fruit cards
 * - buildFungiSection(): Creates the danger zone with fungi cards
 * - renderTree(): Main orchestrator that builds the complete page
 */

const TreeBuilder = {
    
    /**
     * Build the hero header section with tree image and basic info
     */
    buildTreeHeader(data) {
        const headerImageDiv = document.querySelector('.tree-image-box');
        if (headerImageDiv) {
            headerImageDiv.style.backgroundImage = `url('${data.identity.heroImage}')`;
        }
        
        // Update main title and Latin name
        const titleElement = document.querySelector('h1');
        if (titleElement) titleElement.textContent = data.commonName;
        
        const latinElement = document.querySelector('.latin-name');
        if (latinElement) latinElement.textContent = data.latinName;
        
        // Update description
        const descElement = document.querySelector('.tree-info-box p');
        if (descElement) descElement.textContent = data.description;
        
        // Update data grid
        this.buildDataGrid(data.identity);
    },
    
    /**
     * Build the data grid (Family, Lifespan, Height, Status)
     */
    buildDataGrid(identity) {
        const dataGrid = document.querySelector('.data-grid');
        if (!dataGrid) return;
        
        dataGrid.innerHTML = `
            <div class="data-point"><strong>Family</strong> ${identity.family}</div>
            <div class="data-point"><strong>Lifespan</strong> ${identity.lifespan}</div>
            <div class="data-point"><strong>Height</strong> ${identity.height}</div>
            <div class="data-point"><strong>Status</strong> ${identity.status}</div>
        `;
    },
    
    /**
     * Build the identification section (Leaf, Bark, Fruit cards)
     */
    buildIdentificationSection(data) {
        const idCards = document.querySelectorAll('.id-card');
        if (idCards.length < 3) return;
        
        // Update Leaf Card
        const leafCard = idCards[0];
        leafCard.querySelector('img').src = data.identity.leafImage;
        leafCard.querySelector('img').alt = `${data.commonName} Leaf`;
        leafCard.querySelector('p').textContent = data.identity.leafDescription;
        
        // Update Bark Card
        const barkCard = idCards[1];
        barkCard.querySelector('img').src = data.identity.barkImage;
        barkCard.querySelector('img').alt = `${data.commonName} Bark`;
        barkCard.querySelector('p').textContent = data.identity.barkDescription;
        
        // Update Fruit Card
        const fruitCard = idCards[2];
        fruitCard.querySelector('img').src = data.identity.fruitImage;
        fruitCard.querySelector('img').alt = `${data.commonName} Fruit`;
        fruitCard.querySelector('p').textContent = data.identity.fruitDescription;
    },
    
    /**
     * Build a single fungi card
     */
    buildFungiCard(fungus) {
        const riskClass = fungus.risk.toLowerCase().includes('high') ? 'risk-high' : 'risk-mod';
        
        return `
            <div class="fungi-card">
                <div class="fungi-img" style="background-image: url('${fungus.image}');"></div>
                <div class="fungi-details">
                    <div style="display:flex; align-items:center; margin-bottom:5px;">
                        <div class="fungi-name">${fungus.name}</div>
                        <span class="danger-badge ${riskClass}">${fungus.risk}</span>
                    </div>
                    <div class="rot-type"><em>${fungus.scientific}</em> | ${fungus.rot}</div>
                    <p><strong>The Danger:</strong> ${fungus.dangerText}</p>
                </div>
            </div>
        `;
    },
    
    /**
     * Build the complete fungi/danger section
     */
    buildFungiSection(data) {
        const dangerSection = document.querySelector('.danger-section');
        if (!dangerSection) return;
        
        let html = `
            <h2 class="section-title" style="background:none; padding-left:0; color:var(--danger-red);">
                Structural Threats & Fungi
            </h2>
            <p>The following fungi are commonly associated with this species and pose varying risks to human safety through structural failure.</p>
        `;
        
        // Build each fungi card
        data.fungi.forEach(fungus => {
            html += this.buildFungiCard(fungus);
        });
        
        dangerSection.innerHTML = html;
    },
    
    /**
     * Main render function - orchestrates all the building
     */
    renderTree(treeKey) {
        const data = treeData[treeKey];
        if (!data) {
            console.error(`Tree data not found for key: ${treeKey}`);
            return;
        }
        
        // Update page title
        document.title = `Una Arbor | ${data.commonName}`;
        
        // Build all sections
        this.buildTreeHeader(data);
        this.buildIdentificationSection(data);
        this.buildFungiSection(data);
        
        console.log(`✓ Successfully rendered: ${data.commonName} (${data.latinName})`);
    }
};

