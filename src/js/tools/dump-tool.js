import CONST from '../canvas-const.js';

class DumpTool {
    constructor(canvasWrapper, eventAggregator) {
        eventAggregator.subscribeTo(CONST.TOOL.DUMP, 'DumpTool', dumpJson);
        function dumpJson() {
            var oContainer = document.querySelector('#dumpArea');

            oContainer.innerHTML = JSON.stringify(canvas, null, 2);
            oContainer.className = oContainer.className.indexOf('active') >= 0 ? '' : 'active';
        };
    }
}
export default DumpTool;