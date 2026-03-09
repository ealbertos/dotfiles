return {
  {
    "tpope/vim-rails",
    config = function()
      vim.keymap.set("n", "<leader>ra", function()
        vim.cmd("A")
      end, { desc = "Rails: Alternate File" })
      vim.keymap.set("n", "<leader>rc", function()
        vim.cmd("Econtroller")
      end, { desc = "Rails: Open Controller" })
    end,
  },
}
