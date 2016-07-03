/**
 * This file simply sets up some defaults for the fpsmeter library and adds a <section> to nest
 * the meter inside so that we can use some plain ol' CSS to control it.
 *
 * The plugin makes some pretty big CSS assumptions about how we want to use it which is annoying,
 * so we have to set a lot of positioning options in order to make it play nicely with the flow of
 * the DOM.
 */
(function () {
    let meter;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        let container = document.createElement('section');

        container.id = 'fps-meter-container';

        meter = new FPSMeter(container, {
            graph   : true,
            heat    : true,
            theme   : 'dark',
            position: 'relative',
            left    : 'auto',
            top     : 'auto',
            right   : 'auto',
            bottom  : 'auto'
        });

        document.body.insertBefore(container, document.body.firstChild);

        meter.tickStart();

        fpsTick();
    }

    function fpsTick() {
        meter.tick();

        requestAnimationFrame(fpsTick);
    }
}());
