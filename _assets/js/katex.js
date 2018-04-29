//= require katex/dist/katex

// render latex
$(function() {
    $("span.math").replaceWith(function() {
        var tex = $(this).text();
        var displayMode;
        if ($(this).hasClass("inline")) {
            displayMode = false;
        } else if ($(this).hasClass("display")) {
            displayMode = true;
        } else {
            displayMode = tex.startWith("\\[");
        }
        if (displayMode) {
            tex = tex.replace(/^\\\[/, "").replace(/\\\]$/, "");
        } else {
            tex = tex.replace(/^\\\(/, "").replace(/\\\)$/, "");
        }
        return katex.renderToString(tex, {
            displayMode: displayMode
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
