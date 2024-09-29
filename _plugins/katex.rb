# frozen_string_literal: true

require "execjs"
require "jekyll"
require "nokogiri"
require "pathname"

module KaTeX
  module_function

  KATEX_JS = Pathname.new("#{__FILE__}/../../node_modules/katex/dist/katex.js")
                     .expand_path
  KATEX = ExecJS.compile(KATEX_JS.read)

  def render_equation(tex, display_mode)
    KATEX.call "katex.renderToString", tex, displayMode: display_mode
  end

  def render_html(html)
    html.css("span.math").each do |node|
      tex = node.content
      display_mode = tex.start_with? '\['
      if display_mode
        tex.gsub!(/^\\\[/, "")
        tex.gsub!(/\\\]$/, "")
      else
        tex.gsub!(/^\\\(/, "")
        tex.gsub!(/\\\)$/, "")
      end
      node.replace render_equation(tex, display_mode)
    end
    html.css(".kdmath").each do |node|
      tex = node.content
      display_mode = tex.start_with? "$$"
      if display_mode
        tex.gsub!(/^\$\$/, "")
        tex.gsub!(/\$\$$/, "")
      else
        tex.gsub!(/^\$/, "")
        tex.gsub!(/\$$/, "")
      end
      node.replace render_equation(tex, display_mode)
    end
    html.to_html
  end

  def render_html_page(input)
    html = Nokogiri::HTML(input)
    render_html(html)
  end

  def render_html_fragment(input)
    html = Nokogiri::HTML.fragment(input)
    render_html(html)
  end
end

Jekyll::Hooks.register :pages, :post_render do |page|
  page.output = KaTeX.render_html_page(page.output) if page.html?
end

Jekyll::Hooks.register :posts, :post_render do |post|
  post.output = KaTeX.render_html_page(post.output)
end
