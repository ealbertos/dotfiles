return {
  --   {
  --     "folke/tokyonight.nvim",
  --     lazy = false,
  --     priority = 1000,
  --     opts = {
  --       style = "night", -- The theme comes in four styles: storm, moon, night, and day
  --       light_style = "day",
  --       transparent = false,
  --       terminal_colors = true,
  --       styles = {
  --         comments = { italic = true },
  --         keywords = { italic = true },
  --         functions = {},
  --         variables = {},
  --         sidebars = "dark",
  --         floats = "dark",
  --       },
  --       sidebars = { "qf", "help", "terminal", "packer" },
  --       day_brightness = 0.3,
  --       hide_inactive_statusline = false,
  --       dim_inactive = false,
  --       lualine_bold = true,
  --
  --       -- Customize specific highlights
  --       on_colors = function(colors) end,
  --       on_highlights = function(highlights, colors) end,
  --     },
  --   },
  --
  --   {
  --     "LazyVim/LazyVim",
  --     opts = {
  --       colorscheme = "tokyonight-night",
  --     },
  --   },

  {
    "catppuccin/nvim",
    lazy = true,
    name = "catppuccin",
    opts = {
      integrations = {
        aerial = true,
        alpha = true,
        cmp = true,
        dashboard = true,
        flash = true,
        fzf = true,
        grug_far = true,
        gitsigns = true,
        headlines = true,
        illuminate = true,
        indent_blankline = { enabled = true },
        leap = true,
        lsp_trouble = true,
        mason = true,
        markdown = true,
        mini = true,
        native_lsp = {
          enabled = true,
          underlines = {
            errors = { "undercurl" },
            hints = { "undercurl" },
            warnings = { "undercurl" },
            information = { "undercurl" },
          },
        },
        navic = { enabled = true, custom_bg = "lualine" },
        neotest = true,
        neotree = true,
        noice = true,
        notify = true,
        semantic_tokens = true,
        snacks = true,
        telescope = true,
        treesitter = true,
        treesitter_context = true,
        which_key = true,
      },
    },
    specs = {
      {
        "akinsho/bufferline.nvim",
        optional = true,
        opts = function(_, opts)
          if (vim.g.colors_name or ""):find("catppuccin") then
            opts.highlights = require("catppuccin.special.bufferline").get_theme()
          end
        end,
      },
    },
  },

  {
    "LazyVim/LazyVim",
    opts = {
      colorscheme = "catppuccin-latte",
    },
  },
}
