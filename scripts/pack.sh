#!/bin/bash

# Colours
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Check for environment argument, default to "local"
ENV=${1:-local}
RAW=false

# Function to display script usage
usage() {
    echo "Usage: $0 <Target Environment> [--raw]"
    echo
    echo "Target Environment options:"
    echo -e "  ${YELLOW}local${NC}        ['local']"
    echo -e "  ${BLUE}development${NC}  ['d' | 'dev' | 'development']"
    echo -e "  ${PURPLE}staging${NC}      ['s' | 'stg' | 'staging']"
    echo -e "  ${GREEN}production${NC}   ['p' | 'prod' | 'production']"
    echo
    echo "Options:"
    echo -e "  ${RED}--raw${NC}        ['-r' | '--raw']"
    echo "    Outputs the build output with original formatting."
}

# Parse arguments
for arg in "$@"; do
  case $arg in
    p | prod | production)
      ENV="production"
      ;;
    s | stg | staging)
      ENV="staging"
      ;;
    d | dev | development)
      ENV="development"
      ;;
    local)
      ENV=$arg
      ;;
    -r | --raw)
      RAW=true
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
    staging)
      echo -e "${PURPLE}Environment: $ENV${NC}"
      ;;
    production)
      echo -e "${GREEN}Environment: $ENV${NC}"
      ;;
    *)
      echo "Environment: $ENV"
      ;;
  esac
}

# Silent logging used to prevent output from being mixed with the build output.
# Keeps the output colours.
SILENT_LOG=/tmp/silent_log_$$.txt
trap "/bin/rm -f $SILENT_LOG" EXIT

function silent {
    script -q $SILENT_LOG $* > /dev/null;
    cat "${SILENT_LOG}";
}

process_env() {
    local ENV=$1
    TARGET_ENV=$ENV 

    print_env $ENV

    echo -n "⏳ 🔨 Building..."
    if [ "$RAW" = true ]; then
        build_output=$(silent NODE_ENV=production TARGET_ENV=$TARGET_ENV npm run build 2>&1)
        build_exit_code=$?
        if [ $build_exit_code -eq 0 ]; then
            echo -e "\r\033[0K✅ 🔨 Build successful"
        else
            echo -e "\r\033[0K❌ 🔨 Build failed"
            echo -e "\n🔍 Build Output:"
            echo "$build_output"
            exit 1
        fi
    else
        NODE_ENV=production TARGET_ENV=$TARGET_ENV npm run build 2>&1
    fi

    echo -n "⏳ 📦 Publishing locally with yalc..."
    if output=$(yalc publish --sig); then
        version=$(echo "$output" | grep -o '@subifinancial/subi-connect@[^ ]*')
        echo -e "\r\033[0K✅ 📦 Published locally with yalc\n\t$version"
    else
        echo -e "\r\033[0K❌ 📦 Failed to publish with yalc"
    fi

    # Print build output with original formatting
    if [ "$RAW" = true ]; then
        echo -e "\n🔍 Build Output:"
        echo "$build_output"
    fi
}

process_env $ENV