return {
  {
    "tpope/vim-rails",
    config = function()
      vim.keymap.set("n", "<leader>ra", ":A<CR>")
      vim.keymap.set("n", "<leader>rc", ":Econtroller<CR>")
      vim.keymap.set("n", "<leader>rv", function()
        vim.ui.input({ prompt = "View name: " }, function(view)
          if view then
            vim.cmd("Eview " .. view)
          end
        end)
      end)
    end
  }
}
