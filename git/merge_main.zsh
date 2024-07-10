# Merge main into current branch
merge_main() {
  # local current_branch=$(git branch --show-current)

  # git checkout main
  # git pull origin main

  # git checkout $current_branch
  # git merge main

  # Copy the name of the current branch to the clipboard
  current_branch=$(git rev-parse --abbrev-ref HEAD)
  echo $current_branch | pbcopy

  # Retrieve the branch name from the clipboard
  copied_branch=$(pbpaste)

  # Checkout the main branch
  git checkout main
  git pull

  # Return to the previous branch and merge main into it
  git checkout $copied_branch
  git merge main
}
