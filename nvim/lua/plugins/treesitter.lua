-- return {
--   "nvim-treesitter/nvim-treesitter",
--   opts = function(_, opts)
--     opts.ensure_installed = opts.ensure_installed or {}
--     vim.list_extend(opts.ensure_installed, {
--       "html",
--       "javascript",
--       "glimmer", -- Ember's templating (better for .hbs)
--       "handlebars",
--     })
--     opts.highlight = opts.highlight or {}
--     opts.highlight.enable = true
--
--     -- Force enable for handlebars
--     opts.highlight.additional_vim_regex_highlighting = { "handlebars" }
--   end,
-- }

return {
  "nvim-treesitter/nvim-treesitter",
  opts = function(_, opts)
    -- Ensure installed parsers
    opts.ensure_installed = opts.ensure_installed or {}
    vim.list_extend(opts.ensure_installed, {
      "html",
      "javascript",
      "glimmer", -- Ember's templating (better for .hbs)
      "handlebars",
    })

    -- Highlight configuration
    opts.highlight = opts.highlight or {}
    opts.highlight.enable = true
    opts.highlight.additional_vim_regex_highlighting = { "handlebars" }

    -- 🔥 PERFORMANCE: Disable treesitter on large files (over 100KB)
    opts.highlight.disable = function(lang, buf)
      local max_filesize = 100 * 1024 -- 100 KB
      local ok, stats = pcall(vim.loop.fs_stat, vim.api.nvim_buf_get_name(buf))
      if ok and stats and stats.size > max_filesize then
        return true
      end
    end

    -- 🔥 PERFORMANCE: Disable incremental selection (rarely used, adds overhead)
    opts.incremental_selection = { enable = false }

    return opts
  end,
}
