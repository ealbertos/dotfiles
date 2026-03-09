alias reload!='. ~/.zshrc'

alias cls='clear' # Good 'ol Clear Screen command
alias opnotes='nvim ~/Library/Mobile\ Documents/iCloud~md~obsidian/Documents/notes/random.md'
alias notes='nvim ~/Library/Mobile\ Documents/iCloud~md~obsidian/Documents/notes/'

alias edit='tmux new-session -A -s main "nvim"'

# Mac setup for pomo
alias work="timer 60m && terminal-notifier -message 'Pomodoro'\
        -title 'Work Timer is up! Take a Break 😊'\
        -appIcon '~/Pictures/pumpkin.png'\
        -sound Crystal"
        
alias rest="timer 10m && terminal-notifier -message 'Pomodoro'\
        -title 'Break is over! Get back to work 😬'\
        -appIcon '~/Pictures/pumpkin.png'\
        -sound Crystal"
