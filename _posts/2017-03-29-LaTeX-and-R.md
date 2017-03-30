---
layout: post
title: "Typesetting with LaTeX and R"
description: ""
category:
tags: ["LaTeX", "R"]
---

Sometimes, it is desirable to run R codes directly in your LaTeX document. For example, you may wish typeset your course assignment in LaTeX, in which the experiment results as well as figures can be computed by R. And the [knitr][knitr] package is one of the most elegant ways to fulfill such need.

There are many approaches to install R and the knitr package. Below are two possible ways.

* Install R using your favorite package manager or directly from the [official website][r]. And install knitr by running `install.packages('knitr', dependencies = TRUE)` in the R prompt.
* Install R using [Anaconda][anaconda] by running `conda install -c r r-essentials` in the shell. It will install R along with some most common used R libraries including the knitr. This approach is especially beneficial under the Windows operating system.

Based on your favorite editor, different configuration can be implemented to setup for automatically and continues LaTeX compiling. You may refer to [this blog][knitr-editor] for more information. However, what is missing is how to compile LaTeX with R (knitr) using [latexmk][latexmk], which is one of the most widely used tools to compile LaTeX document and is supported by almost all of LaTeX editors.

Therefore, I wrote up below piece of code to allow latexmk work with the knitr files (`.Rnw` or `.Rtex`) seamlessly. You could append them in your global `~/.latexmkrc` file or local `.latexmkrc` under the project root.

{% highlight perl linenos %}
# only enable when compiling .Rnw or .Rtex file
if(grep(/\.(rnw|rtex)$/i, @ARGV)) {
    $latex = 'internal knitrlatex ' . $latex;
    $pdflatex = 'internal knitrlatex ' . $pdflatex;
    my $knitr_compiled = {};
    sub knitrlatex {
        for (@_) {
            next unless -e $_;
            my $input = $_;
            next unless $_ =~ s/\.(rnw|rtex)$/.tex/i;
            my $tex = $_;
            my $checksum = (fdb_get($input))[-1];
            if (!$knitr_compiled{$input} || $knitr_compiled{$input} ne $checksum) {
                my $ret = system("Rscript -e \"knitr::knit('$input')\"");
                if($ret) { return $ret; }
                rdb_ensure_file($rule, $tex);
                $knitr_compiled{$input} = $checksum;
            }
        }
        return system(@_);
    }
    # clean up generated .tex file when running `latexmk -c <root_file>`
    $clean_ext .= ' %R.tex';
}
{% endhighlight %}

For me, it works nicely under vim with the [vimtex plugin][vimtex]. Just name the file with `.Rnw` extension, and edit and compile it like normal LaTeX file.

 [knitr]: https://yihui.name/knitr/
 [r]: https://www.r-project.org
 [anaconda]: https://www.continuum.io/downloads
 [knitr-editor]: https://yihui.name/knitr/demo/editors/
 [latexmk]: https://www.ctan.org/pkg/latexmk/
 [vimtex]: https://github.com/lervag/vimtex/
