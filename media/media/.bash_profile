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
# use .nvmrc or .node-version 
eval "$(fnm env --use-on-cd)"

# Add govm shim
add_to_path "$HOME/.govm/shim"

alias githubauth="gh auth login"
alias githubnew="gh repo create auth --public --source=. --remote=origin"
alias gitpushmain="git branch -M main && git add . && git commit -am 'this' && git push -u origin main"

alias python="python3"
alias pip="pip3"

# Display PATH components with counts on shell startup
echo "PATH components with counts:"
echo "$PATH" | tr ':' '\n' | sort | uniq -c

# Function to run OAuth servers
run_oauth_servers() {
    DEBUG=express:* npx concurrently \
        "npx nodemon authorizationServer.js" \
        "npx nodemon client.js" \
        "npx nodemon protectedResource.js"
}

# Function to recursively delete directories using rimraf
rimraf() {
    if [ $# -eq 0 ]; then
        echo "Usage: rimraf <directory1> [directory2 ...]"
        echo "Example: rimraf node_modules dist build"
        return 1
    fi
    
    # Loop through all arguments
    for dir in "$@"; do
        if [ ! -d "$dir" ]; then
            echo "Skipping: $dir (directory does not exist)"
            continue
        fi
        echo "Deleting: $dir"
        npx rimraf "$dir"
    done
}
