return {
  "neovim/nvim-lspconfig",
  opts = function(_, opts)
    local util = require("lspconfig.util")
    opts.servers = opts.servers or {}

    -- Disable auto-detected rubocop LSP (we use none-ls instead)
    opts.servers.rubocop = false
    
    -- Disable ruby_lsp (we use none-ls for diagnostics + Copilot + Treesitter)
    opts.servers.ruby_lsp = false

    -- 👇 Handlebars using HTML LSP
    opts.servers.html = {
      filetypes = { "html", "handlebars" },
      root_dir = util.root_pattern(".git", "package.json"),
    }

    -- 👇 Emmet for HTML/CSS autocompletion
    opts.servers.emmet_ls = {
      filetypes = { "html", "handlebars", "css", "scss" },
    }

    -- Note: Ruby support is provided by:
    -- - RuboCop via none-ls (diagnostics/formatting)
    -- - Copilot (completions)
    -- - Treesitter (syntax highlighting)
  end,
}
