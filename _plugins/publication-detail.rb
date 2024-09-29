# frozen_string_literal: true

require "date"
require "jekyll"
require "jekyll/scholar"

def publication_detail_permalink(entry)
  "/publication/#{entry.key.sub(":", "/")}/".downcase
end

class PublicationDetail < Jekyll::Page
  def initialize(site, base, dir, entry_data)
    @site = site
    @base = base
    @dir = dir
    @name = "index.html"

    process(@name)
    read_yaml(File.join(base, "_layouts"), "publication_detail.html")

    data.merge!(entry_data)
    data["permalink"] = dir
    data["title"] = strip_html(data["entry"]["title"]) if data["entry"]["title"]
    data["id"] = data["entry"]["key"]
  end

  def strip_html(input)
    input.to_s
         .gsub(/<script[^>]*>.*<\/script>/m, "")
         .gsub(/<!--|--!?>/, "")
         .gsub(/<style.*?<\/style>/m, "")
         .gsub(/<.*?>/m, "")
  end
end

class PublicationDetailGenerator < Jekyll::Generator
  include Jekyll::Scholar::Utilities

  safe true
  priority :high

  attr_reader :config

  def generate(site)
    @site = site
    @config = Jekyll::Scholar.defaults.merge(site.config["scholar"] || {})

    entries.each do |entry|
      detail = PublicationDetail.new(site, site.source, publication_detail_permalink(entry), reference_data(entry))
      detail.render(site.layouts, site.site_payload)
      detail.write(site.dest)

      site.pages << detail

      site.regenerator.add_dependency site.in_source_dir(detail.path),
                                      bibtex_path
    end
  end
end

module PublicationDetailTags
  class PublicationAuthors < Liquid::Tag
    def render(context)
      entry = context["entry"] || context["page"]["entry"]
      authors = entry["author_array"]
      if authors.size == 1
        format_author(authors.first)
      else
        v = authors.map { |author| format_author(author) }
        v[-1] = "and #{v[-1]}"
        v.join(", ")
      end
    end

    def format_author(author)
      %w[first prefix last suffix].map do |field|
        v = author[field]
        v if v && !v.empty?
      end.compact.join(" ")
    end
  end

  class PublicationDate < Liquid::Tag
    def render(context)
      entry = context["entry"] || context["page"]["entry"]
      day = entry["day"]
      month = entry["month_numeric"]
      month = Date::MONTHNAMES[month.to_i] if month
      year = entry["year"]
      if year && month && day
        "#{month} #{day}, #{year}"
      elsif year && month
        "#{month} #{year}"
      elsif year
        year
      else
        "N/A"
      end
    end
  end

  class PublicationVenue < Liquid::Tag
    def render(context)
      entry = context["entry"] || context["page"]["entry"]
      if entry["type"] == "article"
        v = entry["journal"]
        return "<span class=\"pub-venue-journal\">#{v}</span>" if v && !v.empty?
      end

      if entry["type"] == "inproceedings"
        v = entry["booktitle"]
        return "In <span class=\"pub-venue-conf\">#{v}</span>" if v && !v.empty?
      end

      "N/A"
    end
  end

  class PublicationType < Liquid::Tag
    def render(context)
      entry = context["entry"] || context["page"]["entry"]
      if entry["type"] == "article"
        "Journal article"
      elsif entry["type"] == "inproceedings"
        "Conference paper"
      else
        "Other"
      end
    end
  end

  class PublicationBibTeX < Liquid::Tag
    def render(context)
      entry = context["entry"] || context["page"]["entry"]
      bibtex = entry["bibtex"].strip
      bibtex.gsub(/ \(\\textbf(\{(?:[^{}]|\g<1>)*\})\)/, "")
    end
  end
end

Liquid::Template.register_tag("publication_authors", PublicationDetailTags::PublicationAuthors)
Liquid::Template.register_tag("publication_date", PublicationDetailTags::PublicationDate)
Liquid::Template.register_tag("publication_venue", PublicationDetailTags::PublicationVenue)
Liquid::Template.register_tag("publication_type", PublicationDetailTags::PublicationType)
Liquid::Template.register_tag("publication_bibtex", PublicationDetailTags::PublicationBibTeX)
