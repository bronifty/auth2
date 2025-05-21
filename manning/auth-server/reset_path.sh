#!/bin/bash

# Clear the current PATH
export PATH=""

# Set a basic PATH
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

# Function to add to PATH only if not already there
add_to_path() {
    if [ -d "$1" ] && [[ ":$PATH:" != *":$1:"* ]]; then
        export PATH="$PATH:$1"
    fi
}

# Add Homebrew paths manually instead of using shellenv
add_to_path "/usr/local/bin"
add_to_path "/usr/local/sbin"

# Add NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Add Go paths
add_to_path "/usr/local/go/bin"

# Add govm shim
add_to_path "$HOME/.govm/shim"

# Print the new PATH
echo "New PATH:"
echo "$PATH"

# Print PATH components one per line for easier reading
echo -e "\nPATH components:"
echo "$PATH" | tr ':' '\n'

# Update .bash_profile with this clean configuration
cat > ~/.bash_profile << 'EOF'
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

# Add NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Add Go paths
add_to_path "/usr/local/go/bin"

# Add govm shim
add_to_path "$HOME/.govm/shim"

alias gitpushmain="git branch -M main && git add . && git commit -am 'this' && git push -u origin main"

alias python="python3"
alias pip="pip3"
EOF

echo -e "\nUpdated ~/.bash_profile with clean PATH configuration."
echo "Please open a new terminal window to see the changes take effect." 