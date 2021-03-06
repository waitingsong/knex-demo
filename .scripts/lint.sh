#!/bin/bash

input="$@"
scope=''

if [ -z "$input" ]; then
  lerna run lint
else
  for pkg in $input
  do
    scope="$scope --scope $pkg"
  done

  lerna run lint --parallel $scope
fi

