import ArrowTool from '../../src/js/tools/arrow-tool';
import Browser from '../../src/js/browser-api';


describe('Tools', () => {
  describe('Arrow', () => {
    let arrowTool, eventAggregatorInvocationCount;
    beforeEach(() => {
      var fabric = {};
      // var triangleSpy = spy(fabric, 'Triangle')
      eventAggregatorInvocationCount = 0;
      var eventAggregator = {
        subscribeTo: function () {
          eventAggregatorInvocationCount++;
        }
      };

      arrowTool = new ArrowTool({canvas:{}}, eventAggregator, {}, fabric);
    });

    it('should register for event', () => {
      expect(eventAggregatorInvocationCount ).to.equal(1);
    });

  });
});
