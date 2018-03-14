# INTRODUCTION 
### Peter Valentino for Governor


## Requirements
  - Setup authentication to Github via SSH
  - Node
  - Grunt-CLI
  - MAMP Pro or WAMP

## Install

  $ npm install grunt-cli -g (if not already installed)
  $ npm install
  
  Create VirtualHost to host from 
  $ "LOCATION TO PROJECT DIRECTORY"/valentino/dist
  
  and add to hosts file:
  $ 127.0.0.1 valentino

#### Build
Builds the 'dist' folder
Run this after npm install

  $ grunt build

#### Develop
Builds all files and folders and launches browserSync server. Watches files in 'src' and auto refreshes development environment.

  $ grunt develop

