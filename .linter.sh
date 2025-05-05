#!/bin/bash
cd /home/kavia/workspace/code-generation/geeksphere-portfolio-73981-main-container-for-geeksphere-portfolio-73981-73988/core_component_for_geeksphere_portfolio
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

