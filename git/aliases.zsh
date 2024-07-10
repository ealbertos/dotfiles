# Use `hub` as our git wrapper:
#   http://defunkt.github.com/hub/
hub_path=$(which hub)
if (( $+commands[hub] ))
then
  alias git=$hub_path
fi

# The rest of my fun git aliases
alias gpu='git pull --prune'
alias glg="git log -n 10 --graph --pretty=format:'%Cred%h%Creset %an: %s - %Creset %C(yellow)%d%Creset %Cgreen(%cr)%Creset' --abbrev-commit --date=relative"
alias glog="git log --graph --pretty=format:'%Cred%h%Creset %an: %s - %Creset %C(yellow)%d%Creset %Cgreen(%cr)%Creset' --abbrev-commit --date=relative"
alias gl="git log -n 25 --oneline"
alias glc="git log --oneline"
alias glb="git log master.. --oneline"
alias gp='git push -u origin HEAD'
alias gd='git diff'
alias gc='git commit'
alias gca='git commit -a'
alias gcm='git commit -m'
alias gcam='git commit -am'
alias gcamd='git commit --amend -m'
alias gco='git checkout'
alias gcb='git copy-branch-name'
alias gb='git branch'
alias gnb='git checkout -b'
alias gst='git status -sb' # upgrade your git if -sb breaks for you. it's fun.
# alias gst='git status' # upgrade your git if -sb breaks for you. it's fun.
alias glom='git pull origin master'
alias gpom='git push origin master'
alias g='git'
alias ga='git add'
alias uncache='git rm --cached -r '
alias grebase='git pull --rebase'
alias amend= "!git log -n 1 --pretty=tformat:%s%n%n%b | git commit -F - --amend"
alias gtrim="git branch --merged | egrep -v '(^\*|master|main|dev)' | xargs git branch -d"
alias gcom='git checkout main'

#gh cli aliases
alias ghprl="gh pr list --search 'user-review-requested:@me'"
alias ghprc='gh pr create --title'
alias ghilm="gh issue list --assignee '@me'"
