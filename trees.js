/**
 * UNA ARBOR TREE DATABASE
 *
 * This file contains all tree species data for the Una Arbor encyclopedia.
 * To add a new tree, simply copy the structure below and fill in the details.
 *
 * Structure Guide:
 * - commonName: The common English name of the tree
 * - latinName: The scientific Latin name (in italics on the page)
 * - description: A brief paragraph about the tree
 * - identity: Core identification data
 *   - family: Botanical family name
 *   - lifespan: Typical lifespan range
 *   - height: Maximum height
 *   - status: Native/Introduced/etc.
 *   - heroImage: Main tree photo (full tree view)
 *   - leafImage: Close-up of leaf
 *   - leafDescription: Text describing leaf characteristics
 *   - barkImage: Close-up of bark
 *   - barkDescription: Text describing bark characteristics
 *   - fruitImage: Close-up of fruit/seed
 *   - fruitDescription: Text describing fruit characteristics
 * - fungi: Array of fungi that pose structural risks
 *   - name: Common name of the fungus
 *   - scientific: Latin name
 *   - risk: "High Risk" or "Moderate Risk"
 *   - rot: Type of rot (e.g., "Brown Cubical Rot")
 *   - dangerText: Description of the structural danger
 *   - image: URL or path to fungus image
 */

const treeData = {
    // ========================================
    // ENGLISH OAK (Quercus robur)
    // ========================================
    "english-oak": {
        commonName: "English Oak",
        latinName: "Quercus robur",
        description: "The English Oak is the most dominant native tree in the UK. A symbol of strength, it supports more life than any other native tree species, hosting hundreds of insect species and fungi.",

        identity: {
            family: "Fagaceae",
            lifespan: "500-1000 Years",
            height: "Up to 40m",
            status: "Native",

            // Hero image (full tree view)
            heroImage: "images/test.png",

            // Leaf identification
            leafImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Quercus_robur_leaf_01.jpg/320px-Quercus_robur_leaf_01.jpg",
            leafDescription: "Deeply lobed with short stalks. Look for the distinct \"ear lobes\" (auricles) at the very base of the leaf.",

            // Bark identification
            barkImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Quercus_robur_bark.jpg/320px-Quercus_robur_bark.jpg",
            barkDescription: "Greyish-brown. Smooth when young, but develops deep, rugged fissures and ridges as it ages.",

            // Fruit identification
            fruitImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Quercus_robur_Acorns.jpg/320px-Quercus_robur_Acorns.jpg",
            fruitDescription: "Acorns are borne on long stalks (peduncles), which distinguishes this from the Sessile Oak."
        },

        // Structural threat fungi
        fungi: [
            {
                name: "Chicken of the Woods",
                scientific: "Laetiporus sulphureus",
                risk: "High Risk",
                rot: "Brown Cubical Rot",
                dangerText: "Causes brittle fracture in the heartwood. The tree can look healthy externally but snap suddenly without warning.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Laetiporus_sulphureus_JPG1.jpg/320px-Laetiporus_sulphureus_JPG1.jpg"
            },
            {
                name: "Beefsteak Fungus",
                scientific: "Fistulina hepatica",
                risk: "Moderate Risk",
                rot: "Brown Rot",
                dangerText: "Resembles raw meat. Causes a slow brown rot. While less aggressive than others, it can lead to brittle failure in the long term.",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fistulina_hepatica_45070.jpg/320px-Fistulina_hepatica_45070.jpg"
            }
        ]
    }

    // ========================================
    // ADD NEW TREES BELOW THIS LINE
    // ========================================
    // Simply copy the structure above and modify the data
    // Example:
    // "silver-birch": {
    //     commonName: "Silver Birch",
    //     latinName: "Betula pendula",
    //     ...
    // }
};