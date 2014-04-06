
build: components
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test: build
	mocha-phantomjs test/index.html

standalone:
	component build --standalone ripple-refs --name standalone
	-rm -r dist
	mkdir dist
	sed 's/this\[\"ripple-refs\"\]/this.ripple.refs/g' build/standalone.js > dist/ripple-refs.js
	rm build/standalone.js
	minify dist/ripple-refs.js dist/ripple-refs.min.js

.PHONY: clean test standalone
