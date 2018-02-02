require "bibtex"

class Boldface < BibTeX::Filter
  def apply(value)
    # Use of \g<1> pattern back-reference to allow for capturing nested {} groups.
    # The first (outermost) capture of $1 is used.
    value.to_s.gsub(/\\textbf(\{(?:[^{}]|\g<1>)*\})/) {
      "<b>#{$1[1..-2]}</b>"
    }
  end
end
