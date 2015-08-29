import Browser from './browser-api.js';
import Canvas from './canvas-wrapper.js';
import EventAggregator from './event-aggregator.js';

import ArrowTool from './tools/arrow.js';
import BoxTool from './tools/box.js';
import ResetTool from './tools/clear-tool.js';
import DumpTool from './tools/dump-tool.js';
import HorizontalLineTool from './tools/hline.js';
import RemoveTool from './tools/remove-tool.js';
import TextTool from './tools/text.js';
import HorizontalBar from './controls/horizontal-bar.js';


function setupTool(domId, toolResource, canvasTool, eventAggregator) {    
    var toolInstance = new toolResource(canvasTool, eventAggregator);

    if (!toolInstance.init) {
        console.log('Tool ' + domId + ' has no init function!');
    } else {
        toolInstance.init();
    }
    return toolInstance;
}

class RechartJs {

    constructor(domId, imagePath, options) {
        var events = new EventAggregator();
        
        var canvas = new Canvas(domId, imagePath);

        var c = canvas.canvas;
        var toolbar = new HorizontalBar(events, document.getElementById(domId));


        var hasToolsDef = !!options && !!options.tools;

        if (!hasToolsDef || options.tools.indexOf('rectangle') >= 0)
            setupTool('action_box', BoxTool, canvas, events);
        if (!hasToolsDef || options.tools.indexOf('reset') >= 0)
            setupTool('action_clear', ResetTool, canvas, events);
        if (!hasToolsDef || options.tools.indexOf('text') >= 0)
            setupTool('action_text', TextTool, canvas, events);
        if (!hasToolsDef || options.tools.indexOf('hline') >= 0)
            setupTool('action_hline', HorizontalLineTool, canvas, events,document.getElementById('action_hline') );
        if (!hasToolsDef || options.tools.indexOf('arrow') >= 0)
            setupTool('action_arrow', ArrowTool, canvas, events);
        if (!hasToolsDef || options.tools.indexOf('remove') >= 0)
            setupTool('action_remove', RemoveTool, canvas, events);
        if (!hasToolsDef || options.tools.indexOf('dump') >= 0)
            setupTool('action_dump', DumpTool, canvas, events);

        // var oRemoveBtn = document.querySelector('#action_remove');

        // var onSelect = function(options) {
        //     oRemoveBtn.className = c.getActiveObject() ? '' : 'inactive';
        // };
        // c.on('object:selected', onSelect).on('selection:cleared', onSelect);

    }
}

new Browser().appendToWindow('RechartJs', RechartJs);

export default RechartJs;