AFRAME.registerComponent('shellatoms', {
    init: function () {
        var el = this.el;
        var scene = document.querySelector('a-scene');

        var bondPos = el.getAttribute('position');
        var bondRot = el.getAttribute('rotation');
        var bondLength = el.getAttribute('geometry').height;

        var atomPosX = [(bondPos.x - bondLength / 2 * Math.sin(bondRot.x * Math.PI / 180.0)), (bondPos.x + bondLength / 2 * Math.sin(bondRot.x * Math.PI / 180.0))];
        var atomPosY = [(bondPos.y - bondLength / 2 * Math.cos(bondRot.y * Math.PI / 180.0)), (bondPos.y + bondLength / 2 * Math.cos(bondRot.y * Math.PI / 180.0))];
        var atomPosZ = [(bondPos.z - bondLength / 2 * Math.sin(bondRot.z * Math.PI / 180.0)), (bondPos.z + bondLength / 2 * Math.sin(bondRot.z * Math.PI / 180.0))];

        for (var i = 0; i < atomPosX.length; i++) {
            let newEntity = document.createElement('a-atom');
            newEntity.setAttribute('position', {x: atomPosX[i], y: atomPosY[i], z: atomPosZ[i]});
            newEntity.setAttribute('opacity', '0.3');
            newEntity.setAttribute('class', 'shell-obj');
            newEntity.setAttribute('color', 'green');
            newEntity.setAttribute('visible', 'false');
            newEntity.setAttribute('event-set__makevisible', {_event: 'mouseenter', visible: 'true'});
            newEntity.setAttribute('event-set__makeinvisible', {_event: 'mouseleave', visible: 'false'});
            scene.appendChild(newEntity);

            newEntity.addEventListener('click', function () {
                var placedAtom = document.createElement('a-atom');
                placedAtom.setAttribute('position', newEntity.getAttribute('position'));
                placedAtom.setAttribute('class', 'placed');
                placedAtom.setAttribute('color', 'gray');
                placedAtom.setAttribute('type', 'C');
                
                scene.removeChild(newEntity);
                scene.appendChild(placedAtom);
            });
        }
    }
});
