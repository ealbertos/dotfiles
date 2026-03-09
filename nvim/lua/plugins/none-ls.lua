-- Personal dotfiles: LSP-only for Ruby (no Docker rubocop).
-- none-ls can be used for other formatters/diagnostics if needed.
return {
  "nvimtools/none-ls.nvim",
  dependencies = { "nvim-lua/plenary.nvim" },
  opts = function()
    local null_ls = require("null-ls")
    return {
      sources = {
        -- No rubocop here; use LSP (rubocop + ruby_lsp) instead.
      },
    }
  end,
}
