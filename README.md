# holman does dotfiles
dotfiles

Your dotfiles are how you personalize your system. These are mine.

I was a little tired of having long alias files and everything strewn about (which is extremely common on other dotfiles projects, too). That led to this project being much more topic-centric. I realized I could split a lot of things up into the main areas I used (Ruby, git, system libraries, and so on), so I structured the project accordingly.

If you're interested in the philosophy behind why projects like these are awesome, you might want to read my post on the subject.

# install

Run this:

    git clone https://github.com/ealbertos/dotfiles.git ~/.dotfiles
    cd ~/.dotfiles
    script/bootstrap
This will symlink the appropriate files in .dotfiles to your home directory. Everything is configured and tweaked within ~/.dotfiles.

The main file you'll want to change right off the bat is zsh/zshrc.symlink, which sets up a few paths that'll be different on your particular machine.

Also you may want to check [osx defaults](https://github.com/joseramonc/dotfiles/tree/master/osx) before setting them up. 

dot is a simple script that installs some dependencies, sets sane OS X defaults, and so on. Tweak this script, and occasionally run dot from time to time to keep your environment fresh and up-to-date. You can find this script in bin/.
