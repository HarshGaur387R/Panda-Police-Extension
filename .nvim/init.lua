-- .nvim/init.lua
-- Windows-specific Treesitter configuration (if needed)
-- If you have compiler issues with treesitter on Windows you can try:
-- require("nvim-treesitter.install").compilers = { "clang" }

----------------------------
-- BOOTSTRAP: ensure 'lazy' is available
----------------------------
-- (Assumes you already installed lazy.nvim. If not, follow its README first.)

----------------------------
-- LSP / MASON / CMP / SNIPPETS
----------------------------
-- Mason: manage LSP servers, DAP servers, linters, formatters
require("mason").setup()
require("mason-lspconfig").setup({
	ensure_installed = { "cssls", "html" }, -- ensure cssls is installed
})

-- nvim-cmp (completion)
local cmp_status_ok, cmp = pcall(require, "cmp")
if not cmp_status_ok then
	vim.notify("cmp not found", vim.log.levels.WARN)
	return
end

local luasnip_ok, luasnip = pcall(require, "luasnip")
if not luasnip_ok then
	vim.notify("luasnip not found; snippets disabled", vim.log.levels.INFO)
end

cmp.setup({
	snippet = {
		expand = function(args)
			if luasnip_ok then
				luasnip.lsp_expand(args.body)
			end
		end,
	},
	mapping = cmp.mapping.preset.insert({
		["<C-Space>"] = cmp.mapping.complete(),
		["<CR>"] = cmp.mapping.confirm({ select = true }),
		["<C-n>"] = cmp.mapping.select_next_item(),
		["<C-p>"] = cmp.mapping.select_prev_item(),
	}),
	sources = cmp.config.sources({
		{ name = "nvim_lsp" },
		{ name = "luasnip" },
		{ name = "buffer" },
		{ name = "path" },
	}),
})

-- Attach cmp capabilities to LSP
local capabilities = require("cmp_nvim_lsp").default_capabilities()
-- ensure snippet support is explicitly present
capabilities.textDocument.completion.completionItem.snippetSupport = true
capabilities.textDocument.completion.completionItem.resolveSupport = {
	properties = { "documentation", "detail", "additionalTextEdits" }
}

----------------------------
-- LSP CONFIGURATIONS
----------------------------
local lspconfig = require("lspconfig")

-- HTML LSP
lspconfig.html.setup({
	capabilities = capabilities,
})

-- CSS LSP (Intellisense for CSS, SCSS, LESS)
lspconfig.cssls.setup({
	capabilities = capabilities,
	filetypes = { "css", "scss", "less", "html", "javascriptreact", "typescriptreact" },
	settings = {
		css = { validate = true, lint = { unknownAtRules = "ignore" } },
		scss = { validate = true, lint = { unknownAtRules = "ignore" } },
		less = { validate = true, lint = { unknownAtRules = "ignore" } },
	},
})

----------------------------
-- PLUGINS (lazy.nvim)
----------------------------
require("lazy").setup({

	-- Completion plugins
	{ "hrsh7th/nvim-cmp" },
	{ "hrsh7th/cmp-nvim-lsp" },
	{ "hrsh7th/cmp-buffer" },
	{ "hrsh7th/cmp-path" },
	{ "L3MON4D3/LuaSnip" }, -- snippets
	{ "saadparwaiz1/cmp_luasnip" },

	-- HTML/CSS class name suggestions (works with CSS files too)
	{
		"Jezda1337/nvim-html-css",
		config = function()
			require("html-css"):setup({
				filetypes = {
					"html",
					"htmldjango",
					"javascriptreact",
					"typescriptreact",
					"css",
					"scss",
					"less",
				},
				css_file_paths = {
					"./style.css",
					"../style.css",
					"./styles/global.css",
					"./node_modules/bootstrap/dist/css/bootstrap.min.css",
				},
			})
		end,
	},

	-- Auto pairs
	{
		"windwp/nvim-autopairs",
		event = "InsertEnter",
		config = function()
			require("nvim-autopairs").setup({})
		end,
	},

	-- Auto-tag (for HTML/JSX)
	{
		"windwp/nvim-ts-autotag",
		event = "InsertEnter",
		dependencies = { "nvim-treesitter/nvim-treesitter" },
		config = function()
			require("nvim-ts-autotag").setup()
		end,
	},

})

----------------------------
-- TREESITTER
----------------------------
require("nvim-treesitter.configs").setup({
	ensure_installed = {
		"html",
		"css",
		"scss",
		"javascript",
		"typescript",
		"tsx",
	},
	highlight = { enable = true },
	autotag = { enable = true },
})

----------------------------
-- OPTIONAL: useful keymaps for completion
----------------------------
--vim.api.nvim_set_keymap("i", "<C-Space>", "compe#complete()", { noremap = true, silent = true })

-- End of init.lua
