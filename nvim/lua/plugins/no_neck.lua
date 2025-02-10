return {
  {
    "shortcuts/no-neck-pain.nvim",
    version = "*",
    opts = {
      width = 115,
      colors = {
        blend = 0.3,
        background = "#282c34",
      },
      autocmds = {
        enableOnVimEnter = true,
        skipEnteringNoNeckPainBuffer = true,
      },
      mappings = {
        enabled = true,
        toggle = "<Leader>np",
        widthUp = "<Leader>n=",   -- Increase width
        widthDown = "<Leader>n-", -- Decrease width
      },
      integrations = {
        NeoTree = {
          position = "left",
          -- When `true`, if the tree was opened before enabling the plugin, we will reopen it.
          reopen = true,
        },
      }
    },
  },
}
