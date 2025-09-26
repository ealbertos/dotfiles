return {
  "zbirenbaum/copilot.lua",
  cmd = "Copilot",
  build = ":Copilot auth",
  event = "BufReadPost",
  opts = {
    panel = { enabled = false },
    suggestion = {
      enabled = true,
      auto_trigger = true,
      keymap = {
        accept = "<C-l>", -- o false si prefieres no mapear
        next = "<M-]>",
        prev = "<M-[>",
        dismiss = "<C-]>",
      },
    },
    filetypes = { -- ajusta si quieres excluir/permitir
      markdown = true,
      lua = true,
      gitcommit = true,
      ["*"] = true,
    },
  },
}
