#!/bin/bash
focus=$1
options=""
cmd="ava-ts"

if [[ -n $focus ]]
then
  options+=" --files=\"test/${focus}*\""
fi

eval "${cmd}${options}"
