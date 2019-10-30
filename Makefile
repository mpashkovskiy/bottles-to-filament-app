clean:
	rm -rf node_modules || true
	rm package-lock.json || true

node_modules: package.json
	npm i

start: node_modules
	npm start

package:
	npm run package