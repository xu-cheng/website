require "pathname"
require "rake"

BASE_DIR = Pathname.new(__FILE__).dirname

class Pathname
  def /(other)
    self + other
  end

  def to_str
    to_s
  end
end

task :default => :'build-dev'

# rake build
desc "Build the site (production)"
task :build => :yarn do
  ENV["JEKYLL_ENV"] = "production"
  sh "bundle", "exec", "jekyll", "build"
end

# rake build-dev
desc "Build the site (development)"
task :'build-dev' => :yarn do
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
     "./_site"
end
