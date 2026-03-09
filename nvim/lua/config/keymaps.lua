-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here

-- Alternative file finder (leader+p)
vim.keymap.set("n", "<leader>p", function()
  require("telescope.builtin").find_files({
    hidden = true,
  })
end, { desc = "Find Files (Project)" })

-- Go to definition using Rails conventions
vim.keymap.set("n", "gd", function()
  local word = vim.fn.expand("<cword>")
  require("telescope.builtin").find_files({
    search_file = word,
    hidden = true,
  })
end, { desc = "Find Definition" })

-- Smart gr: use grep for Ruby, LSP for others
vim.keymap.set("n", "gr", function()
  local filetype = vim.bo.filetype
  if filetype == "ruby" or filetype == "eruby" then
    -- Use grep for Ruby files
    require("telescope.builtin").grep_string()
  else
    -- Use LSP for other languages
    vim.lsp.buf.references()
  end
end, { desc = "Find References" })

-- Open a new tab with a terminal
vim.keymap.set("n", "<leader>tt", function()
  vim.cmd("tabnew")
  vim.cmd("term")
end, { desc = "Nueva tab con terminal" })

-- Copy file path to clipboard
vim.keymap.set("n", "<leader>cp", function()
  local full_path = vim.fn.expand("%:p")
  local cwd = vim.fn.getcwd()
  local relative = string.gsub(full_path, "^" .. vim.pesc(cwd .. "/"), "")
  vim.fn.setreg("+", relative)
  print("📋 Copied relative path: " .. relative)
end, { desc = "Copy relative file path to clipboard" })

-- Center after navigation with count
vim.keymap.set("n", "j", function()
  return vim.v.count > 0 and "jzz" or "j"
end, { expr = true, noremap = true })
vim.keymap.set("n", "k", function()
  return vim.v.count > 0 and "kzz" or "k"
end, { expr = true, noremap = true })

-- Center after search navigation (with more reliable centering)
vim.keymap.set("n", "n", function()
  vim.cmd("normal! nzzzv")
  vim.cmd("redraw")
end, { noremap = true, desc = "Next search result (centered)" })

vim.keymap.set("n", "N", function()
  vim.cmd("normal! Nzzzv")
  vim.cmd("redraw")
end, { noremap = true, desc = "Previous search result (centered)" })

vim.keymap.set("n", "*", function()
  vim.cmd("normal! *zzzv")
  vim.cmd("redraw")
end, { noremap = true, desc = "Search word under cursor forward (centered)" })

vim.keymap.set("n", "#", function()
  vim.cmd("normal! #zzzv")
  vim.cmd("redraw")
end, { noremap = true, desc = "Search word under cursor backward (centered)" })

-- Center after pressing Enter in search mode
vim.keymap.set("c", "<CR>", function()
  local cmdtype = vim.fn.getcmdtype()
  if cmdtype == "/" or cmdtype == "?" then
    return "<CR>zzzv"
  else
    return "<CR>"
  end
end, { expr = true, noremap = true, desc = "Center after search" })

-- Theme switchers
vim.keymap.set("n", "<leader>uC", "<cmd>Telescope colorscheme<cr>", { desc = "Colorscheme picker" })

vim.keymap.set("n", "<leader>ut", function()
  local current = vim.g.colors_name or ""
  local next_theme = current:find("latte") and "catppuccin-mocha" or "catppuccin-latte"
  vim.cmd("colorscheme " .. next_theme)
  print("🎨 Theme: " .. next_theme)
end, { desc = "Toggle light/dark theme" })

-- Fast vertical navigation
vim.keymap.set("n", "<C-j>", "5j", { noremap = true, silent = true })
vim.keymap.set("n", "<C-k>", "5k", { noremap = true, silent = true })
