install:
	npm ci

gendiff:
	node bin/gendiff.js -h

lint:
	npx eslint .

test:
	npx jest --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8	

publish:
	npm publish --dry-run

.PHONY: test