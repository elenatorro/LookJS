/****************************************************

- LookJS - 

@module: template
@requires: look.dom
@author: Elena Torro
@description: Creates defaults HTML5 templates with
different settings

*****************************************************/
Look.templates = {
	default: {
		styles: [],
		preScripts: [],
		postScripts: []
	},
	pushStyleFile: function(template, href) {
		Look.templates[template].styles.push(
			{
				tag: 'link',
				attr: {
					rel: 'stylesheet',
					href: href
				}
			}
		)
	},
	pushScriptFile: function(template, src, type) {
		Look.templates[template].postScripts.push(
			{
				tag: 'script',
				attr: {
					type: type || 'text/javascript',
					src: src
				}
			}
		)
	},
	addStyle: function(style) {
		Look.create(style, Look.head)
	},
	addScript: function(script) {
		Look.create(script)
	},
	style: function(templates) {
		templates.forEach(function(template) {
			Look.templates[template].styles.forEach(function(style) {
				Look.templates.addStyle(style)
			})
		})
	},
	script: function(templates) {
		templates.forEach(function(template) {
			Look.templates[template].scripts.forEach(function(script) {
				Look.templates.addScript(script)
			})
		})
	},
	all: function(templates) {
		Look.templates.style(templates)
		Look.templates.script(templates)
	},
	add: function(templates, type) {
		type = type || 'all'
		Look.templates[type](templates)
	}
}