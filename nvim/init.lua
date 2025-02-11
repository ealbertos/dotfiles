require("config.lazy")

vim.opt.clipboard = "unnamedplus"

vim.opt.number = true
vim.opt.relativenumber = true

vim.opt.shiftwidth = 2
vim.opt.tabstop = 2
vim.opt.softtabstop = 2
vim.opt.expandtab = true

vim.opt.smartindent = true

vim.opt.wrap = false

vim.opt.swapfile = false
vim.opt.backup = false
vim.opt.undodir = os.getenv("HOME") .. "/.vim/undodir"
vim.opt.undofile = true

vim.opt.hlsearch = false
vim.opt.incsearch = true

vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")

-- identation
vim.keymap.set("v", "<", "<gv")
vim.keymap.set("v", ">", ">gv")

-- save file
vim.keymap.set({ "n", "i", "v" }, "<C-s>", "<cmd>w<cr><Esc>", { desc = "Guardar archivo y salir de inserción" })
vim.keymap.set("n", "J", "mzJ`z")

-- new file
vim.keymap.set("n", "<leader>fn", "<cmd>enew<cr>", { desc = "New File" })

vim.keymap.set("n", "<leader>xl", "<cmd>lopen<cr>", { desc = "Location List" })

vim.cmd("autocmd FileType ruby setlocal indentkeys-=.")

vim.api.nvim_create_autocmd('TextYankPost', {
  desc = 'Highlight when yanking (copying) text',

  callback = function()
    vim.highlight.on_yank()
  end,
})
