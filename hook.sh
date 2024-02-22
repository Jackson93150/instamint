#!/bin/bash

git config --unset core.hooksPath

HOOK_NAME="pre-commit"
HOOK_NAME2="pre-push"

HOOKS_DIR="./.git/hooks"

HOOK_SCRIPT="${HOOKS_DIR}/${HOOK_NAME}"
HOOK_SCRIPT2="${HOOKS_DIR}/${HOOK_NAME2}"

if [ ! -d "$HOOKS_DIR" ]; then
  echo "Hooks directory doesn't exist. Exiting."
  exit 1
fi

if [ -e "$HOOK_SCRIPT" ]; then
  echo "Hook script already exists: $HOOK_SCRIPT. Exiting."
  exit 1
fi

if [ -e "$HOOK_SCRIPT2" ]; then
  echo "Hook script already exists: $HOOK_SCRIPT2. Exiting."
  exit 1
fi

touch "$HOOK_SCRIPT"

chmod +x "$HOOK_SCRIPT"

cat > "$HOOK_SCRIPT" <<EOF
#!/bin/bash

set -e

cd ./back
npm run lint
npm run format
npm run test

cd ../front
npm run check
npm run lint
npm run format
EOF

echo "Hook script created: $HOOK_SCRIPT"

touch "$HOOK_SCRIPT2"

chmod +x "$HOOK_SCRIPT2"

cat > "$HOOK_SCRIPT2" <<EOF
#!/bin/bash

valid_branch_regex=\"^(main|dev|staging|(feat|tests|(bug|hot)fix)(\/[a-z0-9]+(-[a-z0-9]+)*){1,2})$\"

local_branch=\$(git rev-parse --abbrev-ref HEAD)

if [[ ! \$local_branch =~ \$valid_branch_regex ]]; then
    echo \"This branch violates the branch naming rules. Please rename your branch.\"
    exit 1
fi

exit 0
EOF

echo "Hook script created: $HOOK_SCRIPT2"
