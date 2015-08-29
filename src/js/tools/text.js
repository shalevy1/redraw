
import CONST from '../canvas-const.js';

var editorHeight = 30;
var editor, canvas;

class TextTool {
    constructor(canvasWrapper, eventAggregator) {
        canvas = canvasWrapper.canvas;
        eventAggregator.subscribeTo(CONST.TOOL.TEXT, 'TextTool', textTool);
        eventAggregator.subscribeTo('keydown', 'TextTool', function(topic, sender, keyCode) {
            if (keyCode === 27) {
                abort();
            }
        });
    
        function notify(message) {
            eventAggregator.notify('TOOL_USAGE', CONST.TOOL.TEXT, message);
        }
        
        function abort() {
            if (editor) {
                canvas.remove(editor);
                editor = undefined;
                notify('inactive');
            }
        }
        function textTool(topic, sender, payload) {
            if (payload!=='toolbar-click') {
                abort();
                return;
            }
            notify('active');
            editor = new fabric.IText('Click to leave a comment', {
                fontFamily: 'arial black',
                fontSize: 18,
                left: 100,
                top: -40,
                hasControls: false
            });

            canvas.add(editor);

            var onMove = function(options) {
                if (editor) {
                    editor.set({
                        'top': (options.e.clientY - canvasWrapper.getOffsetTop())
                    });
                    editor.set({
                        'left': options.e.clientX - canvasWrapper.getOffsetLeft()
                    });
                    editor.setCoords();
                    canvas.renderAll();
                }
            };
            canvas.on('mouse:move', onMove);

            function detachTextListener() {
                if (editor) {
                    canvas.off('mouse:move', onMove);
                    canvas.off('mouse:up', detachTextListener);
                    editor.setCoords();
                    editor = undefined;
                    canvas.renderAll();
                    notify('inactive');
                }
            }
            canvas.on('mouse:up', detachTextListener);
        }
    }
}

export default TextTool;