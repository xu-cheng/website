---
layout: post
title: "Reuse TikZ Figures in Both Articles and Slides"
tags: ["LaTeX", "TikZ", "Beamer"]
---

I use LaTeX a lot. I found it an effective tool to write articles, slides (using [beamer](https://ctan.org/pkg/beamer)), and posters (using [tikzposter](https://ctan.org/pkg/tikzposter)). Further more, I use [TikZ/PGF](https://www.ctan.org/pkg/pgf) to draw all the figures. Not only the source code of the figure can be easily managed by version control software like git, TikZ is also well-integrated in beamer to create beautiful animations for slides.

It is common to have the same figure used in multiple places among articles, beamer slides, and posters. Therefore, it is desired to share the TikZ source codes without duplicating the files. Noted, the figures used in the beamer often contain the animations in the form of `\onslide<overlay specification>{...}`. As such, we need to a way to manage these differences in the TikZ source codes and avoid the duplication at the same time.

To tackle this issue, I found a nice solution is to use the [standalone](https://www.ctan.org/pkg/standalone) package. As its name suggests, it can be used to create pictures as standalone or as part of a document. For example, we can create a figure as the following:
{% highlight latex linenos %}
\documentclass[tikz]{standalone}

\usetikzlibrary{calc,positioning}

% Create fake \onslide and other commands for standalone picture
\usepackage{xparse}
\NewDocumentCommand{\onslide}{s t+ d<>}{}
\NewDocumentCommand{\only}{d<>}{}
\NewDocumentCommand{\uncover}{d<>}{}
\NewDocumentCommand{\visible}{d<>}{}
\NewDocumentCommand{\invisible}{d<>}{}

\begin{document}

\begin{tikzpicture}
  \node[draw] (start) { Start };
  \node[draw, right=2cm of start] (end) { End };
  % The following animation will only have affect in beamer.
  % In standalone mode, the figure is static.
  \onslide<2-> { \draw[-latex] (start) -- (end); }
  \coordinate (mid) at ($(start)!.5!(end)$);

  % We could control parts of figure only shown in beamer or vice versa.
  \ifstandalone
    \node[below=1cm of mid] {Only Shown in Standalone Figure};
  \else
    \node[below=1cm of mid] {Only Shown in Beamer};
  \fi
\end{tikzpicture}

\end{document}
{% endhighlight %}

This file can be compiled directly to create standalone picture, which could be helpful if you want to create image used by web pages or other similar scenarios. To include this figure in the article or poster, you can use standalone package in the following manner:

{% highlight latex linenos %}
\documentclass{article}

% `mode=build` tells LaTeX to build the image from the source then use it.
\usepackage[mode=build]{standalone}

\begin{document}

\begin{figure}[t]
  \centering
  \includestandalone[width=0.8\linewidth]{./figure} % without the `.tex` extension
  \caption{TikZ Figure in Article}
\end{figure}

\end{document}
{% endhighlight %}

Finally, this figure can be used in beamer with its animations functioning as normal.
{% highlight latex linenos %}
\documentclass{beamer}

% `mode=tex` means we will use the source file of the figures directly.
\usepackage[mode=tex]{standalone}

% We need to add TikZ definitions again. You could put them in a separated file
% and use `\input{...}` command to avoid the duplication.
\usepackage{tikz}
\usetikzlibrary{calc,positioning}

\begin{document}

\begin{frame}{TikZ Figure in Beamer}
  \begin{figure}
    \centering
    \includestandalone[width=0.8\linewidth]{./figure} % without the `.tex` extension
  \end{figure}
\end{frame}

\end{document}
{% endhighlight %}
