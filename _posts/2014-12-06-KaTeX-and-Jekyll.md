---
layout: post
title: "Rendering LaTeX using KaTeX and Jekyll"
description: ""
category:
tags: ["LaTeX", "Jekyll"]
---

So as a Ph.D. student who studies in Computer Science, using LaTeX to render the equations in my blog is inevitable. In general, I hope the render can support the following features:

* **Markdown Support:** I use Jekyll and markdown to write the blogs. So the render should be integrated to this system seamlessly. Moreover, it should be able to:
   * Use LaTeX code directly in the markdown without any other HTML/JavaScript notion. For example, `$$ E = mc^2 $$` should be rendered to $$ E = mc^2 $$ automatically.
   * Work in default Github Page environment. I want to use Github Page to automatically generate the site. And due to the security reason, [Github doesn't allow running custom plugins for Jekyll][jekyll-doc]. Therefore, the rendering shouldn't depend any non-default plugin or markdown parser.
* **Quality:** Quality is important. The render needs to be fast and output print quality typesetting.

The most popular way to render LaTeX within Jekyll is using [MathJaX][mathjax]. There are lots of blogs (e.g. [this][mathjax-with-jekyll]) to show you how to configure it. But MathJaX has a huge shortage on rendering speed. It's slow, not for a bit, but so slow that you can see the web page refreshing itself.

Recently, I came across a new project [KaTeX][katex]. It's fast as you can see the comparison below in which KaTeX is on the left and MathJax is on the right. There's also a benchmark available [here][katex-vs-mathjax].

<center><img src="https://raw.githubusercontent.com/Khan/KaTeX/gh-pages/katex-comparison.gif" width="80%" alt="KaTeX vs Mathjax"/></center>

So how to make KaTeX work in the Jekyll? [Will Drevo][jekyll-and-katex-willdrevo] offers a comprehensive manual to make it work. However, it requires us to write LaTeX code inside HTML `div` block. And I found [this blog][katex-a-new-way] to explain how to use KaTeX with JavaScript. Combining both of these works, and with some extra effort, I find the approach to use KaTeX seamlessly inside Jekyll.

First of all, we need to configure Jekyll using Kramdown as markdown parser and MathJax as Kramdown's math engine. In result, inline math equation will be rendered into a script block with "math/tex" as type. Like this: `<script type="math/tex"> tex code </script>`. Similarly the display style math equation will turn into a script block with "math/tex; mode=display" as type. Like this: `<script type="math/tex; mode=display"> tex code </script>`.

{% gist xu-cheng/cb91d3284971250cb14e _config.yml %}

Secondly, let us put the required resources into the HTML head.

{% gist xu-cheng/cb91d3284971250cb14e head.html %}

Finally, with the power of jQuery and KaTeX, we replace all the TeX code block to rendered high quality equations fast. But remember, this JavaScript should be loaded at the end of HTML file.

{% gist xu-cheng/cb91d3284971250cb14e katex_render.js %}

Here's the final result of rendered equation in below. Also you can do whatever custom you want in CSS file using class `inline-equation` and `equation`.

$$ P(x)=\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma ^2}} $$


 [jekyll-doc]: http://jekyllrb.com/docs/plugins/
 [mathjax]: http://www.mathjax.org
 [mathjax-with-jekyll]: http://gastonsanchez.com/visually-enforced/opinion/2014/02/16/Mathjax-with-jekyll/
 [katex]: http://khan.github.io/KaTeX/
 [katex-vs-mathjax]: http://jsperf.com/katex-vs-mathjax
 [jekyll-and-katex-willdrevo]: http://web.archive.org/web/20170117172154/http://willdrevo.com/latex-equation-rendering-in-javascript-with-jekyll-and-katex/
 [katex-a-new-way]: http://www.intmath.com/blog/mathematics/katex-a-new-way-to-display-math-on-the-web-9445
