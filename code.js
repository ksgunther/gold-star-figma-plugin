// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'create-stars') {
        const nodes = [];
        for (let i = 0; i < msg.count; i++) {
            const star = figma.createStar();
            star.x = i * 150;
            star.fills = [{ type: 'SOLID', color: { r: .961, g: .8, b: .412 } }];
            star.effects = [{ type: 'DROP_SHADOW', color: { r: .71, g: .722, b: .706, a: 1 }, offset: { x: 0, y: 5 }, radius: 5, visible: true, blendMode: "NORMAL" }];
            star.strokes = [{ type: 'SOLID', color: { r: .949, g: .576, b: .176 } }];
            star.strokeWeight = 2;
            star.cornerRadius = 3;
            figma.currentPage.appendChild(star);
            nodes.push(star);
        }
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
