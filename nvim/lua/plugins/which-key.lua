return {
  "folke/which-key.nvim",
  event = "VeryLazy",
  opts = {
  },
  keys = {
    {
      "<leader>?",
      function()
        require("which-key").show({ global = false })
      end,
      desc = "Buffer Local Keymaps (which-key)",
    },
  },
  config = function()
    local wk = require("which-key")

    wk.add({
      { "<leader> ", group = "Find File",    desc = "Find File" },
      { "<leader>/", group = "Live Grep",    desc = "Live Grep" },
      { "<leader>b", group = "Buffers" },
      { "<leader>e", group = "Oil File Tree" },
      { "<leader>f", group = "Files" },
      { "<leader>g", group = "Git" },
      { "<leader>n", group = "NoNeckPain" },
      { "<leader>a", group = "Copilot" },
    })
  end,
}
