-- bootstrap lazy.nvim, LazyVim and your plugins
require("config.lazy")

-- Usar el portapapeles del sistema (copiar/pegar funciona entre Neovim y el SO)
vim.opt.clipboard = "unnamedplus"

-- Mostrar números de línea
vim.opt.number = true         -- número absoluto en la línea actual
vim.opt.relativenumber = true -- números relativos en las demás líneas

-- Configuración de tabulación e indentación
vim.opt.shiftwidth = 2   -- número de espacios al indentar con >>
vim.opt.tabstop = 2      -- ancho de tabulador real (\t)
vim.opt.softtabstop = 2  -- número de espacios al presionar Tab
vim.opt.expandtab = true -- convierte tabs en espacios

-- Indentación inteligente al crear nuevas líneas
vim.opt.smartindent = true

-- No envolver líneas largas automáticamente
vim.opt.wrap = false

-- Manejo de archivos temporales y undo
vim.opt.swapfile = false                               -- desactiva archivos .swp
vim.opt.backup = false                                 -- no guardar backups adicionales
vim.opt.undodir = os.getenv("HOME") .. "/.vim/undodir" -- carpeta para históricos de undo
vim.opt.undofile = true                                -- permite deshacer incluso después de cerrar el archivo

-- Búsqueda
vim.opt.hlsearch = false -- no resaltar todos los matches
vim.opt.incsearch = true -- mostrar coincidencias mientras escribes

-- Keymaps personalizados

-- En modo visual: mover bloque de texto seleccionado
vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv") -- mover selección una línea abajo
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv") -- mover selección una línea arriba

-- Indentación persistente en visual
vim.keymap.set("v", "<", "<gv") -- al indentar con < vuelve a seleccionar el bloque
vim.keymap.set("v", ">", ">gv") -- al indentar con > vuelve a seleccionar el bloque

-- Guardar archivo con Ctrl+S en cualquier modo
vim.keymap.set({ "n", "i", "v" }, "<C-s>", "<cmd>w<cr><Esc>", { desc = "Guardar archivo y salir de inserción" })

-- En modo normal: juntar líneas sin perder la posición del cursor
vim.keymap.set("n", "J", "mzJ`z")

-- Crear nuevo buffer con <leader>fn
vim.keymap.set("n", "<leader>fn", "<cmd>enew<cr>", { desc = "New File" })

-- Abrir Location List con <leader>xl
vim.keymap.set("n", "<leader>xl", "<cmd>lopen<cr>", { desc = "Location List" })

-- Autocommands

-- Ajuste para archivos Ruby: no auto-indentar al escribir '.'
vim.cmd("autocmd FileType ruby setlocal indentkeys-=.")

-- Resaltar texto copiado (yanked) como feedback visual
vim.api.nvim_create_autocmd("TextYankPost", {
  desc = "Highlight when yanking (copying) text",
  callback = function()
    vim.highlight.on_yank()
  end,
})
