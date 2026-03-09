# Pipe my public key to my clipboard.
alias pubkey="more ~/.ssh/id_rsa.pub | pbcopy | echo '=> Public key copied to pasteboard.'"
alias spubkey="more ~/.ssh/id_ed25519.pub | pbcopy | echo '=> SP Public key copied to pasteboard.'"
