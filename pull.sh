#!/bin/sh
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

if [ $branch != 'exit' ]; then
    echo ""
    echo ""
    echo "\033[43;31m$branch ABR cleaning-assessment-serviceをFetchします。\033[0m"
    yarn add git+ssh://git@github.com:masa9973/cleaning-assessment-service-abr.git#${branch}
fi