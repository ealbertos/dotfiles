return {
  {
    "nvim-lualine/lualine.nvim",
    dependencies = { 'nvim-tree/nvim-web-devicons' },
    config = function()
      local lualine = require('lualine')
      lualine.setup({
        options = {
          theme = 'auto',
          section_separators = { left = "", right = "" },
          component_separators = { left = "⟩", right = "⟨" },
          disabled_filetypes = { 'no-neck-pain' },
          globalstatus = true,
        },
        sections = {
          lualine_a = { 'mode' },
          lualine_b = { 'branch', 'diff', 'diagnostics' },
          lualine_c = {
            function()
              return vim.fn.fnamemodify(vim.fn.expand("%"), ":~:.")
            end,
          },
          lualine_x = { 'encoding', 'fileformat', 'filetype' },
          lualine_y = { 'progress' },
          lualine_z = { 'location' }
        },
        extensions = { 'fugitive' }
      })
    end
  }
}
