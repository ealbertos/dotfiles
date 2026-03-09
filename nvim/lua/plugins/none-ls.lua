return {
  "nvimtools/none-ls.nvim",
  dependencies = { "nvim-lua/plenary.nvim" },
  opts = function()
    local null_ls = require("null-ls")

    return {
      sources = {
        null_ls.builtins.diagnostics.rubocop.with({
          method = null_ls.methods.DIAGNOSTICS_ON_SAVE,
          timeout = 10000,
        }),
      },
    }
  end,
}
