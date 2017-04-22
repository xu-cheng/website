#= require katex/dist/katex

# render latex
$ ->
  $("script[type='math/tex']").replaceWith ->
    "<span class=\"inline-equation\">#{katex.renderToString($(this).text())}</span>"
  $("script[type='math/tex; mode=display']").replaceWith ->
    "<div class=\"equation\">#{katex.renderToString($(this).text(), displayMode: true)}</div>"
