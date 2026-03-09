return {
  "nvim-telescope/telescope.nvim",
  opts = {
    defaults = {
      path_display = { "truncate" },
      preview = {
        filesize_limit = 0.5, -- Don't preview files > 0.5 MB
        timeout = 250, -- Cancel preview if it takes > 250ms
      },
      file_ignore_patterns = {
        "node_modules",
        ".git/",
        "tmp/",
        "log/",
        "vendor/bundle",
      },
    },
    pickers = {
      find_files = {
        find_command = { "fd", "--type", "f", "--strip-cwd-prefix", "--hidden" },
      },
    },
  },
}
