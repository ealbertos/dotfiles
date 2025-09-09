return {
  'echasnovski/mini.nvim',
  version = false,
  config = function()
    require("mini.pairs").setup()

    -- Mappings for mini.move
    -- line_left = '<M-h>',
    -- line_right = '<M-l>',
    -- line_down = '<M-j>',
    -- line_up = '<M-k>',
    require("mini.move").setup()
  end
}
