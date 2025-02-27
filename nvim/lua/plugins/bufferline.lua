return {
  "akinsho/bufferline.nvim",
  event = "VeryLazy",
  keys = {
    { "<leader>bp", "<Cmd>BufferLinePick<CR>",                               desc = "Pick Buffer" },
    { "<leader>bc", "<Cmd>BufferLinePickClose<CR>",                          desc = "Pick and Close" },
    { "<leader>bP", "<Cmd>BufferLineGroupClose ungrouped<CR>",               desc = "Delete Non-Pinned Buffers" },
    { "<leader>br", "<Cmd>BufferLineCloseRight<CR>",                         desc = "Delete Buffers to the Right" },
    { "<leader>bl", "<Cmd>BufferLineCloseLeft<CR>",                          desc = "Delete Buffers to the Left" },
    { "<S-h>",      "<cmd>BufferLineCyclePrev<cr>",                          desc = "Prev Buffer" },
    { "<S-l>",      "<cmd>BufferLineCycleNext<cr>",                          desc = "Next Buffer" },
    { "[b",         "<cmd>BufferLineCyclePrev<cr>",                          desc = "Prev Buffer" },
    { "]b",         "<cmd>BufferLineCycleNext<cr>",                          desc = "Next Buffer" },
    { "[B",         "<cmd>BufferLineMovePrev<cr>",                           desc = "Move buffer prev" },
    { "]B",         "<cmd>BufferLineMoveNext<cr>",                           desc = "Move buffer next" },
    { "<leader>bd", function() require("snacks").bufdelete.delete(opts) end, desc = "Delete Current Buffer" },
    { "<leader>ba", function() require("snacks").bufdelete.other(opts) end,  desc = "Delete Other Buffers" },
  },
  opts = {
    options = {
      close_command = function(n) Snacks.bufdelete(n) end,
      right_mouse_command = function(n) Snacks.bufdelete(n) end,
      diagnostics = "nvim_lsp",
      always_show_bufferline = true,
      -- numbers = function(opts)
      --   return string.format('%s·%s', opts.raise(opts.ordinal), opts.lower(opts.id))
      -- end
    },
  },
  config = function(_, opts)
    require("bufferline").setup(opts)
    -- Fix bufferline when restoring a session
    vim.api.nvim_create_autocmd({ "BufAdd", "BufDelete" }, {
      callback = function()
        vim.schedule(function()
          pcall(nvim_bufferline)
        end)
      end,
    })
  end,
}
