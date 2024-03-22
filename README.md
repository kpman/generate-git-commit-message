# Generate Git Commit Message

This script automates the generation of git commit messages using the OpenAI API.
It captures the staged changes (`git diff --staged`), uses a predefined template, and optionally incorporates the name of a subdirectory as part of the commit message.
The final commit message is then copied to the clipboard for easy use.

## Prerequisites

Before using this script, ensure that you have the `OPENAI_API_TOKEN` environment variable set in your session. This token is required for the script to authenticate with the OpenAI API and generate commit messages. You can set this variable in your shell's configuration file (e.g., `.bashrc`, `.zshrc`) like so:

```sh
export OPENAI_API_TOKEN='your_openai_api_token_here'
```

Replace `your_openai_api_token_here` with your actual OpenAI API token.

## Installation

To install this script globally using `yarn`, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the directory containing the script.
3. Run the following command to install the script globally:

```sh
yarn global add "file:$PWD"
```

## Usage

After installation, you can run the script from any git repository by executing:

```sh
ggcm
```

or

```sh
generate-git-commit-message
```

Ensure you have staged changes (`git add`) before running the script. The script will generate a commit message based on your staged changes and the template provided, then copy this message to your clipboard. You can then use `git commit` and paste the message to commit your changes.

## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).

![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)
