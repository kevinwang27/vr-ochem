AFRAME.registerComponent('shellbonds', {
    init: function () {
        var el = this.el;
        var scene = document.querySelector('a-scene');
        var cursor = scene.querySelector('a-camera a-entity');

        var atomPos = el.getAttribute('position');
        var atomRad = el.getAttribute('geometry').radius;
        var atomFracRad = atomRad * 3 / 4;
        var bondHalfLen = 0.5;
        
        var bondPosArr = [
            // top bottom
            new THREE.Vector3(0, 0+bondHalfLen+atomFracRad, 0), new THREE.Vector3(0, 0-bondHalfLen-atomFracRad, 0),
            // right left
            new THREE.Vector3(0+bondHalfLen+atomFracRad, 0, 0), new THREE.Vector3(0-bondHalfLen-atomFracRad, 0, 0),
            // front back
            new THREE.Vector3(0, 0, 0+bondHalfLen+atomFracRad), new THREE.Vector3(0, 0, 0-bondHalfLen-atomFracRad)
            ];
        
        var bondRotArr = [{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:90},{x:0,y:0,z:90},{x:0,y:90,z:90},{x:0,y:90,z:90}];

        for (var i = 0; i < bondPosArr.length; i++) {
            let newEntity = document.createElement('a-bond');
            newEntity.setAttribute('position', bondPosArr[i]);
            newEntity.setAttribute('rotation', bondRotArr[i]);
            newEntity.setAttribute('opacity', '0.3');
            newEntity.setAttribute('class', 'shell-bond');
            newEntity.setAttribute('color', 'green');
            newEntity.setAttribute('visible', false);
            newEntity.setAttribute('aabb-collider', {objects: '.placedbond'});
            newEntity.setAttribute('event-set__makevisible', {_event: 'mouseenter', visible: true});
            newEntity.setAttribute('event-set__makeinvisible', {_event: 'mouseleave', visible: false});
            el.appendChild(newEntity);

            newEntity.addEventListener('click', function () {
                var bond = document.createElement('a-bond');
                bond.setAttribute('position', newEntity.getAttribute('position').add(atomPos));
                bond.setAttribute('rotation', newEntity.getAttribute('rotation'));
                bond.setAttribute('color', 'gray');
                bond.setAttribute('class', 'placedbond');
                bond.setAttribute('shellatoms', '');

                el.removeChild(newEntity);
                scene.appendChild(bond);
            });

            newEntity.addEventListener('hitclosest', function () {
                el.removeChild(newEntity);
            });
        }

        el.addEventListener('click', function () {
            if (scene.querySelector('a-camera a-entity').is('delete')) {
                var shellAtom = document.createElement('a-atom');
                shellAtom.setAttribute('position', atomPos);
                shellAtom.setAttribute('radius', atomRad);
                shellAtom.setAttribute('opacity', '0.3');
                shellAtom.setAttribute('class', 'shell-atom');
                shellAtom.setAttribute('color', 'green');
                shellAtom.setAttribute('visible', false);
                shellAtom.setAttribute('aabb-collider', {objects: '.placedatom'});
                shellAtom.setAttribute('event-set__makevisible', {_event: 'mouseenter', visible: true});
                shellAtom.setAttribute('event-set__makeinvisible', {_event: 'mouseleave', visible: false});

                scene.removeChild(el);
                scene.appendChild(shellAtom);

                shellAtom.addEventListener('click', function () {
                    var atom = document.createElement('a-atom');
                    atom.setAttribute('position', shellAtom.getAttribute('position'));
                    if (cursor.is('carbon')) {
                        atom.setAttribute('atomlabel', {text: 'C'});
                    } else if (cursor.is('nitrogen')) {
                        atom.setAttribute('atomlabel', {text: 'N'});
                    } else if (cursor.is('oxygen')) {
                        atom.setAttribute('atomlabel', {text: 'O'});
                    } else if (cursor.is('chlorine')) {
                        atom.setAttribute('atomlabel', {text: 'Cl'});
                    } else if (cursor.is('bromine')) {
                        atom.setAttribute('atomlabel', {text: 'Br'});
                    } else if (cursor.is('hydrogen')) {
                        atom.setAttribute('atomlabel', {text: 'H'});
                    }
                    atom.setAttribute('color', 'gray');
                    atom.setAttribute('class', 'placedatom');
                    atom.setAttribute('radius', atomRad);
                    atom.setAttribute('shellbonds', '');

                    scene.removeChild(shellAtom);
                    scene.appendChild(atom);
                });

                shellAtom.addEventListener('hitclosest', function () {
                    scene.removeChild(shellAtom);
                });
            }
        });
    }
});
