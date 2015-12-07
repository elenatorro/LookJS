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
	addStyles: function(templates) {
		templates.forEach(function(template) {
			Look.templates[template].styles.forEach(function(style) {
				Look.templates.addStyle(style)
			})
		})
	},
	addScripts: function(templates) {
		templates.forEach(function(template) {
			Look.templates[template].scripts.forEach(function(script) {
				Look.templates.addScript(script)
			})
		})
	},
	addAll: function(templates) {
		Look.templates.addStyles(templates)
		Look.templates.addScripts(templates)
	},
	script : addScripts,
	style : addStyles,
	all : addAll,
	add: function(templates, type) {
		type = type || 'all'
		Look.templates[type](templates)
	}
}