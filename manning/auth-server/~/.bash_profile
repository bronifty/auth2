echo "~/.bash_profile"

# Set a basic PATH
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

# Function to add to PATH only if not already there
add_to_path() {
    if [ -d "$1" ] && [[ ":$PATH:" != *":$1:"* ]]; then
        export PATH="$PATH:$1"
    fi
}

# Add Homebrew paths manually
add_to_path "/usr/local/bin"
add_to_path "/usr/local/sbin"

# Setup fnm (Fast Node Manager)
eval "$(fnm env --use-on-cd)"

# Add NVM (commented out since we're using fnm now)
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Add Go paths
add_to_path "/usr/local/go/bin"

# Add govm shim
add_to_path "$HOME/.govm/shim"

alias gitpushmain="git branch -M main && git add . && git commit -am 'this' && git push -u origin main"

alias python="python3"
alias pip="pip3"

# Display PATH components with counts on shell startup
echo "PATH components with counts:"
echo "$PATH" | tr ':' '\n' | sort | uniq -c
