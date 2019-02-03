# frozen_string_literal: true

require "rake"

task default: "build-dev"

desc "Build the site (production)"
task build: "deps:all" do
  ENV["JEKYLL_ENV"] = "production"
  sh "bundle", "exec", "jekyll", "build"
end

desc "Build the site (development)"
task "build-dev": "deps:all" do
  ENV["JEKYLL_ENV"] = "development"
  sh "bundle", "exec", "jekyll", "build"
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
  sh "bundle", "exec", "htmlproofer",
     "--allow-hash-href",
     "--check-external-hash",
     "--check-opengraph",
     "--check-html",
     "--check-img-http",
     "--url-ignore=/hust.edu.cn/",
     "./_site"
end
