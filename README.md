# 💻 GenDiff

[![Actions Status](https://github.com/Funkicide/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Funkicide/frontend-project-lvl2/actions)
![Test-check](https://github.com/Funkicide/frontend-project-lvl2/actions/workflows/test-check.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/0f3bc2b06d4c737c3663/maintainability)](https://codeclimate.com/github/Funkicide/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0f3bc2b06d4c737c3663/test_coverage)](https://codeclimate.com/github/Funkicide/frontend-project-lvl2/test_coverage)

## ❓ What is GenDiff?
GenDiff is a .js library and a CLI tool that compares two configuration files and shows a difference. Supports .json and .yaml/.yml files.

**Available ouput formats:**
* stylish - default
* plain
* json

## System requirements

* NodeJS >= 12 <= 18
* NPM >= 6.x
* Make

## 🔧 Setup

### As cli tool:

```sh
git clone git@github.com:Funkicide/frontend-project-lvl2.git
cd frontend-project-lvl2
make install
npm link
```

### As library:

```sh
npm i ./frontend-project-lvl2/
```

## Usage

### As cli tool:

```sh
gendiff format filepath filepath
```
### As library:

```sh
import genDiff from '@hexlet/code'

genDiff(filepath, filepath, formatName)
```

## Usage demos:
### Gendiff shallow .json files demo:
https://asciinema.org/a/025xyRo7zDOc7X4jkHAHMzg2T
### Gendiff shallow .yaml files demo:
https://asciinema.org/a/v1GmUx7SbphdtxJI1GcO1u2EZ
### Gendiff nested files demo (Stylish):
https://asciinema.org/a/mKEWurhrhGnKg6kMGouRbalVz
### Gendiff nested files demo (Plain):
https://asciinema.org/a/jIoAS9Lr6r6zneOiY7KyaofGK
### Gendiff nested files demo (JSON):
https://asciinema.org/a/MGURcOolGoRbPqCUkLobtOxOo
