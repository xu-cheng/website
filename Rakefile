# frozen_string_literal: true

require "date"
require "etc"
require "fileutils"
require "json"
require "pathname"
require "rake"
require "shellwords"
require "tempfile"
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
  task all: %w[bundle npm]

  desc "Install ruby dependencies"
  task :bundle do
    sh "bundle", "install"
  end

  desc "Install npm dependencies"
  task :npm do
    sh "npm", "ci", "--include=dev"
    sh "npm", "run", "build"
  end
end

desc "Run html-proofer test"
task :test do
  cookies_file = Tempfile.new("htmlproofer-cookies-")

  typhoeus_config = {
    followlocation: true,
    connecttimeout: 60,
    timeout: 60,
    cookiefile: cookies_file.path,
    cookiejar: cookies_file.path,
  }
  hydra_config = {
    max_concurrency: Etc.nprocessors,
  }
  site_url = YAML.safe_load_file("#{__dir__}/_config.yml")["url"]
  raw_site_url = site_url.sub(/^https?:\/\//, "").sub(/\/$/, "")
  sh "bundle", "exec", "htmlproofer",
     "--checks=Links,Images,Scripts,OpenGraph",
     "--no-enforce-https",
     "--swap-urls=https\\://#{Regexp.escape raw_site_url}/:/",
     "--ignore-urls=/hust\\.edu\\.cn/,/doi\\.org/,/scholar\\.google\\.com/",
     "--ignore-status-codes=0,429,999",
     "--typhoeus=#{JSON.dump(typhoeus_config)}",
     "--hydra=#{JSON.dump(hydra_config)}",
     "./_site"
ensure
  cookies_file.close
  cookies_file.unlink
end
