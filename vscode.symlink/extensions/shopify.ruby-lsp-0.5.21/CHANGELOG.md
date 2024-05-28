# vscode-ruby-lsp-v0.5.21
# vscode-ruby-lsp-v0.5.21
## ✨ Enhancements

- Add manual Ruby configuration (https://github.com/Shopify/ruby-lsp/pull/1967) by @vinistock
- Allow configuring extra chruby paths (https://github.com/Shopify/ruby-lsp/pull/1976) by @vinistock
- Log invalid JSON environment (https://github.com/Shopify/ruby-lsp/pull/2000) by @vinistock



# vscode-ruby-lsp-v0.5.20
# vscode-ruby-lsp-v0.5.20
## ✨ Enhancements

- Implement ASDF as a manager object (https://github.com/Shopify/ruby-lsp/pull/1845) by @vinistock

## 🐛 Bug Fixes

- Fix logging manager on activation failure (https://github.com/Shopify/ruby-lsp/pull/1952) by @Earlopain
- Avoid redirecting gem list output to stderr (https://github.com/Shopify/ruby-lsp/pull/1964) by @vinistock
- Avoid setting GEM_HOME and GEM_PATH for rbenv (https://github.com/Shopify/ruby-lsp/pull/1966) by @vinistock



# vscode-ruby-lsp-v0.5.19
# vscode-ruby-lsp-v0.5.19
## 🐛 Bug Fixes

- Fix the discovered version manager logging as `[object Object]` (https://github.com/Shopify/ruby-lsp/pull/1920) by @Earlopain
- Migrate manager config before activating (https://github.com/Shopify/ruby-lsp/pull/1923) by @vinistock



# vscode-ruby-lsp-v0.5.18
# vscode-ruby-lsp-v0.5.18
## ✨ Enhancements

- Implement None and Custom as version manager objects (https://github.com/Shopify/ruby-lsp/pull/1878) by @vinistock
- Allow configuring Mise executable path (https://github.com/Shopify/ruby-lsp/pull/1914) by @vinistock

## 🐛 Bug Fixes

- Enable `no-floating-promises` lint (https://github.com/Shopify/ruby-lsp/pull/1876) by @vinistock
- Remove verbose or debug environment variables from Ruby env (https://github.com/Shopify/ruby-lsp/pull/1889) by @vinistock
- [VSCode] Change the order of existence checks for Manager. Check 'asdf' last. (https://github.com/Shopify/ruby-lsp/pull/1909) by @dlwr

## 📦 Other Changes

- Enhance version manager config to accept more fields (https://github.com/Shopify/ruby-lsp/pull/1831) by @vinistock



# vscode-ruby-lsp-v0.5.17
# vscode-ruby-lsp-v0.5.17
## 🐛 Bug Fixes

- Use VS Code's file API to check for workspace permissions (https://github.com/Shopify/ruby-lsp/pull/1853) by @vinistock
- Use activated environment by RVM (https://github.com/Shopify/ruby-lsp/pull/1868) by @vinistock
- Add ubuntu RVM path to list of possible installations (https://github.com/Shopify/ruby-lsp/pull/1869) by @vinistock



# vscode-ruby-lsp-v0.5.16
# vscode-ruby-lsp-v0.5.16
## ✨ Enhancements

- Implement Windows activation as a manager object (https://github.com/Shopify/ruby-lsp/pull/1796) by @vinistock
- Implement Rbenv activation as a manager object (https://github.com/Shopify/ruby-lsp/pull/1811) by @vinistock
- Enable ruby language on more file types (https://github.com/Shopify/ruby-lsp/pull/1839) by @snutij
- Implement RVM as a manager object (https://github.com/Shopify/ruby-lsp/pull/1828) by @vinistock

## 🐛 Bug Fixes

- Remove path exists and use VS Code's file system (https://github.com/Shopify/ruby-lsp/pull/1650) by @vinistock
- Prepend vscode for relative image references (https://github.com/Shopify/ruby-lsp/pull/1601) by @vinistock
- Return early when building dependencies view if no client (https://github.com/Shopify/ruby-lsp/pull/1848) by @vinistock



# vscode-ruby-lsp-v0.5.15
# vscode-ruby-lsp-v0.5.15
## 🐛 Bug Fixes

- Disable warnings when running Ruby activation (https://github.com/Shopify/ruby-lsp/pull/1618)

## 📦 Other Changes

- Add Mise option to setting enum (https://github.com/Shopify/ruby-lsp/pull/1608)



# vscode-ruby-lsp-v0.5.14
# vscode-ruby-lsp-v0.5.14
## ✨ Enhancements

- Implement Mise as a manager object (https://github.com/Shopify/ruby-lsp/pull/1529)

## 🐛 Bug Fixes

- Set error to false on workspace restart (https://github.com/Shopify/ruby-lsp/pull/1593)
- Remove fs usages in debugger client (https://github.com/Shopify/ruby-lsp/pull/1595)
- Fix broken URL for Ruby version docs (https://github.com/Shopify/ruby-lsp/pull/1599)
- Use ruby as default engine when searching for chruby installation (https://github.com/Shopify/ruby-lsp/pull/1607)



# vscode-ruby-lsp-v0.5.13
# vscode-ruby-lsp-v0.5.13
## ✨ Enhancements

- Implement Shadowenv as a version manager object (https://github.com/Shopify/ruby-lsp/pull/1502)
- Migrate chruby activation to the new version manager implementation (https://github.com/Shopify/ruby-lsp/pull/1438)

## 🐛 Bug Fixes

- Remove pattern from document selector (https://github.com/Shopify/ruby-lsp/pull/1589)



# vscode-ruby-lsp-v0.5.12
# vscode-ruby-lsp-v0.5.12
## ✨ Enhancements

- Remove YJIT setting (https://github.com/Shopify/ruby-lsp/pull/1427)

## 📦 Other Changes

- Merge supportsYjit and yjitEnabled into a single property (https://github.com/Shopify/ruby-lsp/pull/1433)



# vscode-ruby-lsp-v0.5.11
Empty release after merging into a monorepo
