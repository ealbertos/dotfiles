return {
  "saghen/blink.cmp",
  opts = {
    keymap = {
      preset = "default",
      ["<C-l>"] = {
        function(cmp)
          -- If blink completion menu is visible, accept it
          if cmp.is_visible() then
            return cmp.select_and_accept()
          end
          -- Otherwise, try to accept copilot suggestion
          local copilot = require("copilot.suggestion")
          if copilot.is_visible() then
            copilot.accept()
            return true
          end
          -- Fallback: do nothing special
          return false
        end,
        "fallback",
      },
      ["<Tab>"] = { "snippet_forward", "select_next", "fallback" }, -- Navigate forward or expand snippets
    },
  },
}
