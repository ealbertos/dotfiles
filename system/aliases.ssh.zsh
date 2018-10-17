# grc overides for ls
#   Made possible through contributions from generous benefactors like
#   `brew install coreutils`
if $(gls &>/dev/null)
then
  alias ls="gls -F --color"
  alias l="gls -lAh --color"
  alias ll="gls -l --color"
  alias la='gls -A --color'
fi

alias bunicorn='bundle exec unicorn -c config/unicorn.rb --no-default-middleware'
alias binstall='bundle install'
alias bupdate='bundle update'
alias bukey='OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES bundle exec unicorn -c config/unicorn.rb'

# adminpanel
alias aduser='bundle exec rake adminpanel:user'
alias adresource='rails g adminpanel:resource'
alias adgallery='rails g adminpanel:gallery'
alias admig='rails g adminpanel:migration'

# rake
alias rakemig='rake db:migrate'
alias rakeset='rake db:setup'
alias rakeseed='rake db:migrate'

#random
alias bo="boom"
