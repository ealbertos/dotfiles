return {
  {
    'saghen/blink.cmp',
    dependencies = 'rafamadriz/friendly-snippets',
    version = '*',
    opts = {
      keymap = { 
        preset = 'default', 
          ['<C-CR>'] = { 'select_and_accept' },
      },

      appearance = {
        use_nvim_cmp_as_default = true,
        nerd_font_variant = 'mono'
      },
      signature = { enabled = true },
    },
    opts_extend = { "sources.default" }
  }
}
