var box = Look.createFromComponent('Box');


Look.style.setStyle(box, {borderColor: 'orange', borderStyle: 'solid', borderWidth: '3px'});
Look.createFromComponent('Box');

Look.components.extendAttribute('Box', 'BigBox', {attr: {class: 'big'}});

Look.createFromComponent('BigBox');

Look.components.merge('Circle', 'Box', 'CircleBox');

var circle = Look.createFromComponent('CircleBox');

Look.style.setStyle(box, {width: '400px'});


var resize = function(width) {
	var model = this.model;
	Look.style.setStyle(model, {width: width})
};

var scale = function(size) {
	var model = this.model;
	Look.style.setStyle(model, {width: size, height: size})
};

Look.controllers.extend(box,{resize: resize});
setTimeout(function(){ box.operations.resize('800px'); }, 500);

Look.controllers.create(circle, {resize: resize});

function delay(callback) {
    setTimeout(function() {callback()}, 2000);
}

var setTime = function(callback){
    delay(function(){
    	callback();
    });
}

Look.controllers.extend(circle, {scale: scale});
setTime(function(){circle.operations.scale('500px')});