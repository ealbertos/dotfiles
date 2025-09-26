return {
  "akinsho/bufferline.nvim",
  event = "VeryLazy",
  optional = true,
  after = "catppuccin",
  keys = {
    { "<leader>bp", "<Cmd>BufferLinePick<CR>",                 desc = "Pick Buffer" },
    { "<leader>bc", "<Cmd>BufferLinePickClose<CR>",            desc = "Pick and Close" },
    { "<leader>bP", "<Cmd>BufferLineGroupClose ungrouped<CR>", desc = "Delete Non-Pinned Buffers" },
    { "<leader>br", "<Cmd>BufferLineCloseRight<CR>",           desc = "Delete Buffers to the Right" },
    { "<leader>bl", "<Cmd>BufferLineCloseLeft<CR>",            desc = "Delete Buffers to the Left" },
    { "<S-h>",      "<cmd>BufferLineCyclePrev<cr>",            desc = "Prev Buffer" },
    { "<S-l>",      "<cmd>BufferLineCycleNext<cr>",            desc = "Next Buffer" },
    { "[b",         "<cmd>BufferLineCyclePrev<cr>",            desc = "Prev Buffer" },
    { "]b",         "<cmd>BufferLineCycleNext<cr>",            desc = "Next Buffer" },
    { "[B",         "<cmd>BufferLineMovePrev<cr>",             desc = "Move buffer prev" },
    { "]B",         "<cmd>BufferLineMoveNext<cr>",             desc = "Move buffer next" },

    {
      "<leader>bd",
      function()
        if package.loaded["snacks"] and _G.Snacks and _G.Snacks.bufdelete then
          require("snacks").bufdelete.delete()
        else
          vim.cmd("bdelete")
        end
      end,
      desc = "Delete Current Buffer",
    },
    {
      "<leader>ba",
      function()
        if package.loaded["snacks"] and _G.Snacks and _G.Snacks.bufdelete then
          require("snacks").bufdelete.other()
        else
          local cur = vim.api.nvim_get_current_buf()
          for _, b in ipairs(vim.api.nvim_list_bufs()) do
            if vim.api.nvim_buf_is_loaded(b) and b ~= cur then
              pcall(vim.api.nvim_buf_delete, b, { force = false })
            end
          end
        end
      end,
      desc = "Delete Other Buffers",
    },
  },

  opts = function(_, opts)
    opts = opts or {}

    if (vim.g.colors_name or ""):find("catppuccin") then
      opts.highlights = require("catppuccin.special.bufferline").get_theme()
    end

    local function bufdelete_safe(n)
      if package.loaded["snacks"] and _G.Snacks and _G.Snacks.bufdelete then
        _G.Snacks.bufdelete(n)
      else
        vim.api.nvim_buf_delete(n, { force = false })
      end
    end

    opts.options = vim.tbl_deep_extend("force", {
      close_command = function(n)
        bufdelete_safe(n)
      end,
      right_mouse_command = function(n)
        bufdelete_safe(n)
      end,
      diagnostics = "nvim_lsp",
      always_show_bufferline = true,
      -- numbers = function(o)
      --   return string.format('%s·%s', o.raise(o.ordinal), o.lower(o.id))
      -- end
    }, opts.options or {})

    return opts
  end,

  config = function(_, opts)
    require("bufferline").setup(opts)

    -- Fix bufferline when restoring a session
    vim.api.nvim_create_autocmd({ "BufAdd", "BufDelete" }, {
      callback = function()
        vim.schedule(function()
          local ok, bufferline = pcall(require, "bufferline")
          if ok and bufferline and bufferline.refresh then
            pcall(bufferline.refresh)
          else
            pcall(vim.cmd, "redrawtabline")
          end
        end)
      end,
    })
  end,
}
