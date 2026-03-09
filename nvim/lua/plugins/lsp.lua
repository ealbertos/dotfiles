return {
  "neovim/nvim-lspconfig",
  opts = function(_, opts)
    local util = require("lspconfig.util")
    opts.servers = opts.servers or {}

    -- Ruby: use LSP (rubocop + ruby_lsp) — no Docker / none-ls in this repo
    -- opts.servers.rubocop and opts.servers.ruby_lsp use LazyVim defaults when not set to false

    -- 👇 Handlebars using HTML LSP
    opts.servers.html = {
      filetypes = { "html", "handlebars" },
      root_dir = util.root_pattern(".git", "package.json"),
    }

    -- 👇 Emmet for HTML/CSS autocompletion
    opts.servers.emmet_ls = {
      filetypes = { "html", "handlebars", "css", "scss" },
    }

    -- Ruby support: rubocop LSP + ruby_lsp (LSP only, no Docker)
  end,
}
