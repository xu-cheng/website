#= require katex/dist/katex

# render latex
$ ->
  $("script[type='math/tex']").replaceWith ->
    tex = $(this).text()
    "<span class=\"inline-equation\"> #{katex.renderToString(tex)} </span>"
  $("script[type='math/tex; mode=display']").replaceWith ->
    tex = $(this).text()
    "<div class=\"equation\"> #{katex.renderToString(tex, displayMode: true)} </div>"
