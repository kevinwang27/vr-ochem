AFRAME.registerComponent('shellatoms', {
    init: function () {
        var data = this.data;
        var el = this.el;
        var scene = document.querySelector('a-scene');

        function calcAtomCoord(direction) {
            var bondPos = el.getAttribute('position');
            var bondRot = el.getAttribute('rotation');
            var bondLength = el.getAttribute('geometry').height;
            
            if (direction == 1) {
                return bondPos.x + bondLength / 2 * Math.sin(bondRot.x * Math.PI / 180.0);
            } else if (direction == 2) {
                return bondPos.y + bondLength / 2 * Math.cos(bondRot.y * Math.PI / 180.0);
            } else {
                return bondPos.z + bondLength / 2 * Math.sin(bondRot.z * Math.PI / 180.0);
            }
        }

        var atomPosX = [calcAtomCoord(1)];
        var atomPosY = [calcAtomCoord(2)];
        var atomPosZ = [calcAtomCoord(3)];

        for (var i = 0; i < atomPosX.length; i++) {
            var newEntity = document.createElement('a-atom');
            newEntity.setAttribute('position', {x: atomPosX[i], y: atomPosY[i], z: atomPosZ[i]});
            newEntity.setAttribute('opacity', '0.3');
            scene.appendChild(newEntity);
        }
    }
});
