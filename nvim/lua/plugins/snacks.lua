return {
  "folke/snacks.nvim",
  priority = 1000,
  lazy = false,
  opts = {
    bufdelete = { enabled = true },
    explorer = { enabled = false },
    picker = { enabled = false },
    lazygit = { enabled = true },
    dashboard = {
      enabled = true,
      sections = {
        { section = "header" },
        { icon = " ", title = "Keymaps", section = "keys", indent = 2, padding = 1 },
        { icon = " ", title = "Recent Files", section = "recent_files", indent = 2, padding = 1 },
        { icon = " ", title = "Projects", section = "projects", indent = 2, padding = 1 },
        { section = "startup" },
      },
    },
    notifier = {
      enabled = true,
      timeout = 3000,
    },
  },
}
