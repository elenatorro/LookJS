/*############## TEST FUNCTIONS ##############*/
function LookTemplatesStructure() {
	QUnit.test(Look, function(assert) {
		assert.ok(Look.templates)
		assert.ok(Look.templates.pushStyleFile)
	})
}

LookTemplatesStructure()

function PushStyleToDefaultTemplate() {
  QUnit.test(Look, function(assert) {
    Look.templates.pushStyleFile('default', 'templates.test.css')
    assert.equal(Look.templates.default.styles.length, 1)
  })
}

PushStyleToDefaultTemplate();

function AddStylesToDocument() {
	QUnit.test(Look, function(assert) {
		assert.equal(Look.getBy.tagName('link').length, 1)
		Look.templates.addStyles(['default'])
		assert.equal(Look.getBy.tagName('link').length, 2)
	})
}

AddStylesToDocument()

