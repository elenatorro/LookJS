var box = Look.createFromComponent('Box');
Look.style.setStyle(box, {borderColor: 'red', borderStyle: 'solid', borderWidth: '3px'});

Look.createFromComponent('Box');
Look.components.extendAttribute('Box', 'BigBox', {attr: {class: 'big'}});

Look.createFromComponent('BigBox');
Look.components.merge('Circle', 'Box', 'CircleBox');
Look.createFromComponent('CircleBox');