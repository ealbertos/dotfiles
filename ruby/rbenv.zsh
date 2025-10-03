# init according to man page
if (( $+commands[rbenv] ))
then
  eval "$(rbenv init -)"
fi

export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init - zsh)"
