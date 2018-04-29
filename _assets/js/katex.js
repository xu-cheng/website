//= require katex/dist/katex

// render latex
$(function() {
    $("span.math.inline").replaceWith(function() {
        var tex = $(this).text().replace(/^\\\(/, "").replace(/\\\)$/, "");
        return katex.renderToString(tex);
    });
    $("span.math.display").replaceWith(function() {
        var tex = $(this).text().replace(/^\\\[/, "").replace(/\\\]$/, "");
        return katex.renderToString(tex, {
            displayMode: true
        });
    });
    $("script[type='math/tex']").replaceWith(function() {
        return katex.renderToString($(this).text());
    });
    $("script[type='math/tex; mode=display']").replaceWith(function() {
        return katex.renderToString($(this).text(), {
            displayMode: true
        });
    });
});
