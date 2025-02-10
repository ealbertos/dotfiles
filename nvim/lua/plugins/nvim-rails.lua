return {
  {
    "tpope/vim-rails",
    config = function()
      vim.keymap.set("n", "<leader>ra", ":A<CR>")
      vim.keymap.set("n", "<leader>rc", ":Econtroller<CR>")
    end
  }
}
