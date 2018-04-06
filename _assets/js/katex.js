//= require katex/dist/katex

// render latex
$(function() {
    $("script[type='math/tex']").replaceWith(function() {
        return katex.renderToString($(this).text());
    });
    $("script[type='math/tex; mode=display']").replaceWith(function() {
        return katex.renderToString($(this).text(), {
            displayMode: true
        });
    });
});
