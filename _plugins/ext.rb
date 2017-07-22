require "liquid"

module ExtraTextFilters
  def regex_remove_first(input, regex)
    input.to_s.sub(Regexp.new(regex), ''.freeze)
  end

  def regex_remove(input, regex)
    input.to_s.gsub(Regexp.new(regex), ''.freeze)
  end
end

Liquid::Template.register_filter(ExtraTextFilters)
