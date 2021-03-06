# Use `hub` as our git wrapper:
#   http://defunkt.github.com/hub/
hub_path=$(which hub)
if (( $+commands[hub] ))
then
  alias git=$hub_path
fi

# The rest of my fun git aliases
alias gpu='git pull --prune'
alias gl="git log -n 10 --graph --pretty=format:'%Cred%h%Creset %an: %s - %Creset %C(yellow)%d%Creset %Cgreen(%cr)%Creset' --abbrev-commit --date=relative"
alias glog="git log --graph --pretty=format:'%Cred%h%Creset %an: %s - %Creset %C(yellow)%d%Creset %Cgreen(%cr)%Creset' --abbrev-commit --date=relative"
alias gp='git push'
alias gd='git diff'
alias gc='git commit'
alias gca='git commit -a'
alias gcm='git commit -m'
alias gco='git checkout'
alias gcb='git copy-branch-name'
alias gb='git branch'
alias gst='git status -sb' # upgrade your git if -sb breaks for you. it's fun.
# alias gst='git status' # upgrade your git if -sb breaks for you. it's fun.
alias glom='git pull origin master'
alias gpom='git push origin master'
alias g='git'
alias ga='git add'
alias uncache='git rm --cached -r '
alias grebase='git pull --rebase'
alias amend= "!git log -n 1 --pretty=tformat:%s%n%n%b | git commit -F - --amend"
alias gtrim= "git branch --merged | grep -v '*' | xargs -n 1 git branch -d"