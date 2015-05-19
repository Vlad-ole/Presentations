// Set of dependencies
/* jshint -W117 */
define([
    'jquery',
    'config',
    'vendor/events/pubsub'
], function(
    jquery,
    config
) {

    // // monkey patch emit for console.
    // // @todo log only on non-live
    // var oldEmit = jquery.emit;
    // jquery.emit = function(type, args) {
    //     if (
    //         typeof console === 'object' &&
    //         window.location.hostname === 'pal.sandbox.dev.bbc.co.uk' &&
    //         type !== 'newListener'
    //     ) {
    //         // console.log(type, args);
    //     }

    //     return oldEmit(type, args);
    // };

    jquery.ajaxSetup({ cache: true });

    var news = {
        pubsub: jquery, // **
        $: jquery,
        config: config,
        window: window
    };

    return news;
});

/*
    **
    Seems odd to have both `pubsub` and `$` pointing to `jquery`
    but we've changed the implementation of the `pubsub` library
    so that we're no longer uses an external script to handle pubsub.
    Instead we're augmenting the jQuery library itself to handle pubsub.

    But we don't want to affect the interface that the BBC code utilises,
    so we keep the interface API the same while simply changing the underlying codebase.
 */
