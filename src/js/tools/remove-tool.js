/**
 * A tool to remove selected elements from canvas!
 */
import CONST from '../canvas-const.js';
import Browser from '../browser-api.js';

/**
 * A tool to remove selected elements from canvas.
 */
export default class RemoveTool {
    /**
     * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
     * @constructor
     * @param {Canvas} canvasWrapper - Canvas.
     * @param {EventAggregator} eventAggregator - Event mediator.
     */
    constructor(canvasWrapper, eventAggregator) {
        eventAggregator.notify('tool-enabled', CONST.TOOL.REMOVE, false);
        /**
        * Called upon removal.
        */
        var remove = function() {
            var c = canvasWrapper.canvas;
            if (c.getActiveObject()) {
                c.remove(c.getActiveObject());
            }
        };

        eventAggregator.subscribeTo(CONST.TOOL.REMOVE, 'RemoveTool', remove);

        // eventAggregator.subscribe('RemoveTool', function(eventType, keyCode) {
        //     if (eventType === 'keydown' && keyCode === 46) {
        //         remove();
        //     }
        // });
        canvasWrapper.canvas.on('object:selected', function(o) {
            eventAggregator.notify('tool-enabled', CONST.TOOL.REMOVE, true);
        });
        canvasWrapper.canvas.on('selection:cleared', function(o) {
            eventAggregator.notify('tool-enabled', CONST.TOOL.REMOVE, false);
        });
    }
}

var toolProps = {
    label: 'Delete'
};
/**
 * Register tool at the global redraw.registerTool.
 */
(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.REMOVE, RemoveTool, toolProps);