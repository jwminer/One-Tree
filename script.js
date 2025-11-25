/**
 * UNA ARBOR MAIN SCRIPT
 *
 * This is the controller/orchestrator for the Una Arbor encyclopedia.
 * It initializes the page and coordinates the rendering of tree data.
 *
 * Dependencies:
 * - trees.js: Contains the tree data
 * - builder.js: Contains the rendering functions
 */

/**
 * Initialize the application when the DOM is ready
 */
function initializeApp() {
    // Default tree to display (can be changed via URL parameter in future)
    const defaultTree = "english-oak";

    // Check if we have the required dependencies
    if (typeof treeData === 'undefined') {
        console.error('ERROR: trees.js not loaded. Make sure it is included before script.js');
        return;
    }

    if (typeof TreeBuilder === 'undefined') {
        console.error('ERROR: builder.js not loaded. Make sure it is included before script.js');
        return;
    }

    // Render the tree
    TreeBuilder.renderTree(defaultTree);
}

// Start the application when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already ready
    initializeApp();
}