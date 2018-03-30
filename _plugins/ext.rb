require "liquid"

module ExtraTextFilters
  def regex_remove_first(input, regex)
    input.to_s.sub(Regexp.new(regex), ''.freeze)
  end

  def regex_remove(input, regex)
    input.to_s.gsub(Regexp.new(regex), ''.freeze)
  end

  def regex_replace_first(input, regex, replacement = ''.freeze)
    input.to_s.sub(Regexp.new(regex.to_s), replacement.to_s)
  end

  def regex_replace(input, regex, replacement = ''.freeze)
    input.to_s.gsub(Regexp.new(regex.to_s), replacement.to_s)
  end

  # convert `$ inline eqn $` to `$$ inline eqn $$`, so kramdown
  # can properly format the equation.
  def inline_mathify(input)
    input.to_s.gsub(/ \$([^$]+)\$/, " $$\\1$$")
  end
end

Liquid::Template.register_filter(ExtraTextFilters)
