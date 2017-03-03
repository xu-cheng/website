require "pathname"
require "rake"

BASE_DIR = Pathname.new(__FILE__).dirname

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
  if (BASE_DIR/"node_modules/.bin/bower").executable?
    bower = (BASE_DIR/"node_modules/.bin/bower").to_s
  else
    bower = "bower"
  end
  sh bower, "install"
end

# rake test
desc "Run html-proofer test"
task :test do
  require "html-proofer"
  HTMLProofer.check_directory("./_site").run
end
