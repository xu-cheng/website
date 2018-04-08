require "bibtex"
require "pandoc-ruby"

class Pandoc < BibTeX::Filter
  def apply(value)
    html = PandocRuby.convert(value.to_s, :gladtex, from: :latex, to: :html)
    if html.scan("<p>").size == 1
      html.gsub!(%r{</?p>}, "")
    end
    html.gsub!('<EQ ENV="math">', '<script type="math/tex">')
    html.gsub!('<EQ ENV="displaymath">', '<script type="math/tex; mode=display">')
    html.gsub!('</EQ>', '</script>')
    html.strip!
    html
  end
end
