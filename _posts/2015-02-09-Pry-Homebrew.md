---
layout: post
title: "Pry in Interactive Homebrew Shell"
description: ""
category:
tags: ["Homebrew"]
---

Recently, I have been heavily involved to [Homebrew](https://brew.sh)'s development. Homebrew itself offers an interactive
ruby shell, which can be handy for the development. You can use such tool by invoking `brew irb` in the shell. And as what its
name sounds, this tool is based on irb.

Personal, I found [pry][pry] is much more power than irb. For example, Gregg Rothmeier wrote [this blog][pry-top-5] to show
some useful features pry provided. In addition, pry ships with the support of [plugin system][pry-plugin].

So, how to use pry as the front end of interactive Homberew shell? I wrote a piece of code as shown below. Put it in the file `brew-pry` and
make sure it has execute attribute and can be found in the `PATH`. That's it. Run `brew pry` to use pry in Homebrew shell.

{% highlight ruby linenos %}
#!/usr/bin/env ruby

$:.unshift ENV["HOMEBREW_LIBRARY_PATH"]
require "global"
require "formula"
require "keg"
require "pry"

class Symbol
  def f(*args)
    Formulary.factory(to_s, *args)
  end
end
class String
  def f(*args)
    Formulary.factory(self, *args)
  end
end

if ARGV.include? "--examples"
  puts "'v8'.f # => instance of the v8 formula"
  puts ":hub.f.installed?"
  puts ":lua.f.methods - 1.methods"
  puts ":mpd.f.recursive_dependencies.reject(&:installed?)"
else
  ohai "Interactive Homebrew Shell"
  puts "Example commands available with: brew pry --examples"
  Pry.start
end
{% endhighlight %}

**Update (2015/2/16)**

I found using `HOMEBREW_LIBRARY_PATH` to locate Homebrew library path is a better idea.
This can be useful if you have multi Homebrew in your system.

 [pry]: https://pryrepl.org
 [pry-top-5]: https://www.bignerdranch.com/blog/my-top-5-pry-features/
 [pry-plugin]: https://github.com/pry/pry/wiki/Available-plugins
