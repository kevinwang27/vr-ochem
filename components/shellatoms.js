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

        var atomPosX = [(dist * Math.sin(toRad(bondRot.z)) * Math.cos(toRad(bondRot.y))), (0 - dist * Math.sin(toRad(bondRot.z)) * Math.cos(toRad(bondRot.y)))];
        var atomPosY = [(dist * Math.cos(toRad(bondRot.z))), (0 - dist * Math.cos(toRad(bondRot.z)))];
        var atomPosZ = [(dist * Math.sin(toRad(bondRot.z)) * Math.sin(toRad(bondRot.y))), (0 - dist * Math.sin(toRad(bondRot.z)) * Math.sin(toRad(bondRot.y)))];

        for (var i = 0; i < atomPosX.length; i++) {
            let newEntity = document.createElement('a-atom');
            newEntity.setAttribute('position', {x: atomPosX[i], y: atomPosY[i], z: atomPosZ[i]});
            newEntity.setAttribute('radius', atomRad);
            newEntity.setAttribute('opacity', '0.3');
            newEntity.setAttribute('class', 'shell-atom');
            newEntity.setAttribute('color', 'green');
            newEntity.setAttribute('visible', false);
            newEntity.setAttribute('aabb-collider', {objects: '.placedatom'});
            newEntity.setAttribute('event-set__makevisible', {_event: 'mouseenter', visible: true});
            newEntity.setAttribute('event-set__makeinvisible', {_event: 'mouseleave', visible: false});
            el.appendChild(newEntity);

            newEntity.addEventListener('click', function () {
                var atom = document.createElement('a-atom');
                console.log(newEntity.getAttribute('position'));
                atom.setAttribute('position', newEntity.getAttribute('position').add(bondPos));

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
                shellBond.setAttribute('color', 'green');
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
