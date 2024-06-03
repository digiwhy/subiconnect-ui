#!/bin/bash

### Colours
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
###

# Check for environment argument, default to "local"
ENV=${1:-local}
NO_DELETE=false

####
# Function to display script usage
usage() {
 echo "Usage: $0 <Environemnt> [OPTIONS]"
 echo "Environemnt:"
 echo "'local', ['d', 'dev' | 'development'], ['p','prod' | 'production'], or 'all'"
 echo "Options:"
 echo " -n, --no-delete         Do not delete old tarballs"
}

####

# Parse arguments
for arg in "$@"; do
  case $arg in
    p | prod)
      ENV="production"
      ;;
    d | dev)
      ENV="development"
      ;;
    local|production|development|all)
      ENV=$arg
      ;;
    -n | --no-delete)
      NO_DELETE=true
      ;;
    *)
      echo "Invalid usage: $1" >&2
      usage
      exit 1
      ;;
  esac
done

# Function to print environment in different colors
print_env() {
  local ENV=$1
  case $ENV in
    local)
      echo -e "${YELLOW}Environment: $ENV${NC}"
      ;;
    development)
      echo -e "${BLUE}Environment: $ENV${NC}"
      ;;
    production)
      echo -e "${GREEN}Environment: $ENV${NC}"
      ;;
    *)
      echo "Environment: $ENV"
      ;;
  esac
}

process_env() {
    local ENV=$1
    NODE_ENV=$ENV 

    print_env $ENV

    echo "Building..."
    npm run build

    # Remove existing tarballs matching the pattern
    # Remove existing tarballs matching the pattern unless --no-delete is active
    if [ "$NO_DELETE" = false ]; then
        echo "Removing existing tarballs..."
        rm demo/lib/subi-connect@${ENV}-*.tgz
    fi

    # Run npm pack and capture the output
    echo "Creating new tarball..."
    output=$(npm pack)

    # Extract the tarball name
    tarball=$(echo "$output" | tail -n 1)

    # Calculate the SHA-1 hash of the tarball
    shasum=$(shasum "$tarball" | awk '{print $1}')

    # Get the last 5 characters of the shasum
    hash=${shasum: -5}

    # Define the new filename
    new_filename="demo/lib/subi-connect@${ENV}-${hash}.tgz"

    # Rename the tarball
    mv "$tarball" "$new_filename"

    # Output the new filename for confirmation
    echo "Created $new_filename"
}

# Process all environments if "all" is specified
if [ "$ENV" == "all" ]; then
  for ENV in production development local; do
    process_env $ENV
  done
else
  process_env $ENV
fi