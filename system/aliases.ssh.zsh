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

#System alias
alias htdocs="cd /Applications/MAMP/htdocs"
alias src="cd src"
alias dropbox="bash HOME=$HOME/.dropbox-alt /Applications/Dropbox.app/Contents/MacOS/Dropbox &"
alias gw="grunt watch"

alias bunicorn='bundle exec unicorn -c config/unicorn.rb'
alias binstall='bundle install'
alias bupdate='bundle update'

#Server alias
alias codn="ssh root@services.codnlabs.com"
