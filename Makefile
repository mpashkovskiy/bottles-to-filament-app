clean:
	rm -rf node_modules || true
	rm package-lock.json || true

node_modules: package.json
	npm i

lint:
	npm run lint

start: node_modules lint
	npm start

package: node_modules lint
	npm run package