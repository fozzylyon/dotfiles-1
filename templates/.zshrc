# -- Config --------------------------------------------------------------------
# Path to your oh-my-zsh configuration.
ZSH="<%- zsh.path_oh_my_zsh %>"

# -- Theme ---------------------------------------------------------------------
# Set name of the theme to load.
# Look in <%- zsh.path_oh_my_zsh %>/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="<%- zsh.theme_oh_my_zsh %>"

# -- Plugins -------------------------------------------------------------------
# Which plugins would you like to load? (plugins can be found in <%- zsh.path_oh_my_zsh %>/plugins/*)
# Custom plugins may be added to <%- zsh.path_oh_my_zsh %>/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
plugins=(<%- zsh.plugins %>)

# -- Oh My Zsh! ----------------------------------------------------------------
source $ZSH/oh-my-zsh.sh

# -- Options -------------------------------------------------------------------
unsetopt correct_all
unsetopt correct

# -- Aliases -------------------------------------------------------------------
if [[ -f "$HOME/.aliases" ]]; then
    source $HOME/.aliases
fi

# -- Rbenv ---------------------------------------------------------------------
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

# -- Update --------------------------------------------------------------------
dotfiles