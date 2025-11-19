require("lspconfig").html.setup({
	capabilities = require("cmp_nvim_lsp").default_capabilities(),
})

require("lazy").setup({

	{
		"Jezda1337/nvim-html-css",
		config = function()
			require("html-css"):setup({
				filetypes = { "html", "htmldjango", "javascriptreact", "typescriptreact" },
				-- Optional: add your global or local CSS paths
				css_file_paths = {
					"../style.css",
					"./styles/global.css",
					"./node_modules/bootstrap/dist/css/bootstrap.min.css",
				},
			})
		end,
	},
	{
		"windwp/nvim-autopairs",
		event = "InsertEnter",
		config = function()
			require("nvim-autopairs").setup({})
		end,
	},

	{
		"windwp/nvim-ts-autotag",
		event = "InsertEnter",
		dependencies = { "nvim-treesitter/nvim-treesitter" },
		config = function()
			require("nvim-ts-autotag").setup()
		end,
	},

})

require("nvim-treesitter.configs").setup({
	ensure_installed = {
		"html",
		"javascript",
		"typescript",
		"tsx",
	},
	highlight = { enable = true },
	autotag = { enable = true }, -- this is key!
})
