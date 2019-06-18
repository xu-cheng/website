# frozen_string_literal: true

require "date"
require "fileutils"
require "json"
require "pathname"
require "rake"
require "shellwords"
require "yaml"

task default: "build"

desc "Build the site"
task build: %w[deps:all fix-mod-time] do
  sh "bundle", "exec", "jekyll", "build"
end

desc "Fix mod time for files in /file/ folder"
task "fix-mod-time" do
  Pathname.glob("#{__dir__}/file/**/*") do |file|
    next unless file.file?

    author_date = `git log -1 --format="%aI" -- #{file.to_s.shellescape}`.strip
    date = DateTime.iso8601(author_date).to_time
    FileUtils::Verbose.touch file.to_s, mtime: date
  end
end

namespace :deps do
  desc "Install all dependencies"
  task all: %w[bundle yarn]

  desc "Install ruby dependencies"
  task :bundle do
    sh "bundle"
  end

  desc "Install yarn dependencies"
  task :yarn do
    sh "yarn"
  end
end

desc "Run html-proofer test"
task :test do
  typhoeus_config = {
    connecttimeout: 300,
    timeout: 0,
  }
  site_url = YAML.safe_load(File.read("#{__dir__}/_config.yml"))["url"]
  raw_site_url = site_url.sub(/^https?:\/\//, "").sub(/\/$/, "")
  sh "bundle", "exec", "htmlproofer",
     "--allow-hash-href",
     "--check-external-hash",
     "--check-opengraph",
     "--check-html",
     "--check-img-http",
     "--url-swap=https?\\://#{Regexp.escape raw_site_url}/:/",
     "--url-ignore=/hust.edu.cn/",
     "--http-status-ignore=0,999",
     "--typhoeus-config=#{JSON.dump(typhoeus_config)}",
     "./_site"
end
