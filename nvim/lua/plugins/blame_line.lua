return {
  {
    "braxtons12/blame_line.nvim",
    config = function()
      require("blame_line").setup({
        show_in_visual = false,
        show_in_insert = false, -- Don't show while typing
        delay = 1000, -- Wait 1 second before showing (vs default instant)
      })
    end,
  },
}
