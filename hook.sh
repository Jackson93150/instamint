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

echo '#!/bin/bash' > $HOOK_SCRIPT2

echo 'VALID_MODELS_BRANCH="^(main|dev|staging|(feat|tests|(bug|hot)fix)(\/[a-z0-9]+(-[a-z0-9]+)*){1,2})$"' >> $HOOK_SCRIPT2
echo 'LOCAL_BRANCH=$(git rev-parse --abbrev-ref HEAD)' >> $HOOK_SCRIPT2

echo 'if [[ ! "$LOCAL_BRANCH" =~ $VALID_MODELS_BRANCH ]]; then
    echo \"This branch violates the branch naming rules. Please rename your branch.\"
    exit 1
fi' >> $HOOK_SCRIPT2

echo 'exit 0' >> $HOOK_SCRIPT2

echo "Hook script created: $HOOK_SCRIPT2"
