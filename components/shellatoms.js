 AFRAME.registerComponent('shellatoms', {
    init: function () {
        var el = this.el;
        var scene = document.querySelector('a-scene');
        var cursor = scene.querySelector('a-camera a-entity');

        var bondPos = el.getAttribute('position');
        var bondRot = el.getAttribute('rotation');
        var bondHalfLen = el.getAttribute('geometry').height / 2;

        var atomRad = 0.3;
        var dist = bondHalfLen+atomRad*3/4;

        function toRad(deg) {
            return deg * Math.PI / 180.0;
        }

        var atomPosArr = [
            new THREE.Vector3((dist * Math.sin(toRad(bondRot.z)) * Math.cos(toRad(bondRot.y))), (dist * Math.cos(toRad(bondRot.z))), (dist * Math.sin(toRad(bondRot.z)) * Math.sin(toRad(bondRot.y)))),
            new THREE.Vector3((0 - dist * Math.sin(toRad(bondRot.z)) * Math.cos(toRad(bondRot.y))), (0 - dist * Math.cos(toRad(bondRot.z))), (0 - dist * Math.sin(toRad(bondRot.z)) * Math.sin(toRad(bondRot.y))))
        ]

        var atomPosRelArr = [
            new THREE.Vector3(0, dist, 0),
            new THREE.Vector3(0, (0-dist), 0)
        ]

        for (let i = 0; i < atomPosArr.length; i++) {
            let newEntity = document.createElement('a-atom');
            newEntity.setAttribute('position', atomPosRelArr[i]);
            newEntity.setAttribute('radius', atomRad);
            newEntity.setAttribute('opacity', '0.3');
            newEntity.setAttribute('class', 'shell-atom');
            newEntity.setAttribute('color', '#C6E0ED');
            newEntity.setAttribute('visible', false);
            newEntity.setAttribute('aabb-collider', {objects: '.placedatom'});
            newEntity.setAttribute('event-set__makevisible', {_event: 'mouseenter', visible: true});
            newEntity.setAttribute('event-set__makeinvisible', {_event: 'mouseleave', visible: false});
            el.appendChild(newEntity);

            newEntity.addEventListener('click', function () {
                var atom = document.createElement('a-atom');
                if (bondRot.y === 0 && bondRot.z === 90) {
                    atom.setAttribute('position', atomPosArr[1-i].add(bondPos));
                } else {
                    atom.setAttribute('position', atomPosArr[i].add(bondPos));
                }

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

                atom.setAttribute('color', '#DCDCDC');
                atom.setAttribute('class', 'placedatom');
                atom.setAttribute('radius', atomRad);
                atom.setAttribute('shellbonds', '');

                el.removeChild(newEntity);
                scene.appendChild(atom);
            });

            newEntity.addEventListener('hitclosest', function () {
                el.removeChild(newEntity);
            });
        }

        el.addEventListener('click', function () {
            if (scene.querySelector('a-camera a-entity').is('delete')) {
                var shellBond = document.createElement('a-bond');
                shellBond.setAttribute('position', bondPos);
                shellBond.setAttribute('rotation', bondRot);
                shellBond.setAttribute('opacity', '0.3');
                shellBond.setAttribute('class', 'shell-bond');
                shellBond.setAttribute('color', '#C6E0ED');
                shellBond.setAttribute('visible', false);
                shellBond.setAttribute('aabb-collider', {objects: '.placedbond'});
                shellBond.setAttribute('event-set__makevisible', {_event: 'mouseenter', visible: true});
                shellBond.setAttribute('event-set__makeinvisible', {_event: 'mouseleave', visible: false});

                scene.removeChild(el);
                scene.appendChild(shellBond);

                shellBond.addEventListener('click', function () {
                    var bond = document.createElement('a-bond');
                    bond.setAttribute('position', shellBond.getAttribute('position'));
                    bond.setAttribute('rotation', shellBond.getAttribute('rotation'));
                    bond.setAttribute('color', '#DCDCDC');
                    bond.setAttribute('class', 'placedbond');
                    bond.setAttribute('shellatoms', '');

                    scene.removeChild(shellBond);
                    scene.appendChild(bond);
                });

                shellBond.addEventListener('hitclosest', function () {
                    scene.removeChild(shellBond);
                });
            }
        });
    }
});
