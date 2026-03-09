return {
  {
    "shortcuts/no-neck-pain.nvim",
    version = "*",
    opts = {
      width = 125,
      colors = {
        blend = 0.3,
      },
      autocmds = {
        enableOnVimEnter = false,
        skipEnteringNoNeckPainBuffer = true,
      },
      mappings = {
        enabled = true,
        toggle = "<Leader>np",
        widthUp = "<Leader>n=",
        widthDown = "<Leader>n-",
      },
    },
    config = function(_, opts)
      require("no-neck-pain").setup(opts)

      local group = vim.api.nvim_create_augroup("NoNeckPainOnFile", { clear = true })

      vim.api.nvim_create_autocmd("BufEnter", {
        group = group,
        callback = function()
          local ft = vim.bo.filetype
          local buftype = vim.bo.buftype
          local bufname = vim.api.nvim_buf_get_name(0)

          -- Dashboard / special buffers: disable no-neck-pain so dashboard shows normally
          if ft == "snacks" or ft == "alpha" or ft == "no-neck-pain" then
            if _G.NoNeckPain and _G.NoNeckPain.state and _G.NoNeckPain.state.enabled then
              pcall(require("no-neck-pain").disable)
            end
            return
          end

          -- Only enable for normal file buffers (not terminal, nofile, etc.)
          if buftype ~= "" then
            return
          end
          if bufname == "" or bufname:match("^term://") then
            return
          end

          -- Avoid re-enabling if already on
          if _G.NoNeckPain and _G.NoNeckPain.state and _G.NoNeckPain.state.enabled then
            return
          end

          pcall(require("no-neck-pain").enable, "buf_enter_file")
        end,
      })
    end,
  },
}
