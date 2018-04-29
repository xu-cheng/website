require "bibtex"
require "pandoc-ruby"

class Pandoc < BibTeX::Filter
  def apply(value)
    html = PandocRuby.convert(value.to_s, :katex, from: :latex, to: :html)
    if html.scan("<p>").size == 1
      html.gsub!(%r{</?p>}, "")
    end
    html.strip
  end
end
