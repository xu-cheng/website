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
task :build => :bower do
  ENV["JEKYLL_ENV"] = "production"
  sh "bundle", "exec", "jekyll", "build"
end

# rake build-dev
desc "Build the site (development)"
task :'build-dev' => :bower do
  ENV["JEKYLL_ENV"] = "development"
  sh "bundle", "exec", "jekyll", "build"
end

# rake bower
desc "Install bower components"
task :bower do
  bower = BASE_DIR/"node_modules/.bin/bower"
  bower = "bower" unless bower.executable?
  sh bower, "install"
end

# rake test
desc "Run html-proofer test"
task :test do
  require "html-proofer"
  HTMLProofer.check_directory("./_site").run
end
