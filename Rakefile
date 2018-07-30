# frozen_string_literal: true

require "rake"

task default: :'build-dev'

# rake build
desc "Build the site (production)"
task build: :yarn do
  ENV["JEKYLL_ENV"] = "production"
  sh "bundle", "exec", "jekyll", "build"
end

# rake build-dev
desc "Build the site (development)"
task 'build-dev': :yarn do
  ENV["JEKYLL_ENV"] = "development"
  sh "bundle", "exec", "jekyll", "build"
end

# rake yarn
desc "Install front-end dependencies"
task :yarn do
  sh "yarn"
end

# rake test
desc "Run html-proofer test"
task :test do
  sh "bundle", "exec", "htmlproofer",
     "--check-external-hash",
     "--check-opengraph",
     "--check-html",
     "--url-ignore=/hust.edu.cn/",
     "./_site"
end
