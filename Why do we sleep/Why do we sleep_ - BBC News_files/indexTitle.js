define([
    'module/bootstrap'
], function(
    news
) {
    var indexTitle;
    var titleId = '#comp-index-title';
    var hiddenClass = 'index-title--redundant';

    function getIndexTitle() {
        if (typeof indexTitle === 'undefined') {
            var indexTitleElement = news.$(titleId);
            var meta = indexTitleElement.data('index-title-meta') || null;
            var alwaysVisible = false;
            var onFrontPage = false;

            if (meta && meta.opts) {
                alwaysVisible = meta.opts.alwaysVisible || false;
                onFrontPage = meta.opts.onFrontPage || false;
            }

            indexTitle = {
                element: indexTitleElement,
                alwaysVisible: alwaysVisible,
                onFrontPage: onFrontPage
            };
        }

        return indexTitle;
    }

    /**
     * Used by GNL to update the title and url on story pages.
     * @deprecated
     */
    var setAnchorAttribute = function() {};

    /**
     * Used by GNL to append the is sponsored text inside the title element and vertical align to the baseline.
     * @deprecated
     */
    var appendToTitle = function() {};

    /**
     * Used by GNL to update the title and url on story pages.
     * @param html - the HTML to replace
     */
    var setTitleHtml = function(html) {
        var storyTitleElement = news.$(titleId + ' .index-title__container'),
            indexTitleElement = storyTitleElement.length !== 0 ? storyTitleElement : news.$(titleId);
        if (indexTitleElement.length !== 0) {
            indexTitleElement.html(html);
        }
    };

    var show = function() {
        if (!getIndexTitle().onFrontPage) {
            getIndexTitle().element.removeClass(hiddenClass);
        }
    };

    var hide = function() {
        if (!getIndexTitle().alwaysVisible) {
            getIndexTitle().element.addClass(hiddenClass);
        }
    };

    var toggle = function() {
        if (getIndexTitle().element.hasClass(hiddenClass)) {
            show();
        } else {
            hide();
        }
    };

    var init = function() {
        if (!getIndexTitle().onFrontPage) {
            show();
        }
    };

    return {
        getIndexTitle: getIndexTitle,
        setTitleHtml: setTitleHtml,
        setAnchorAttribute: setAnchorAttribute,
        appendToTitle: appendToTitle,
        show: show,
        hide: hide,
        toggle: toggle,
        init: init
    };
});
