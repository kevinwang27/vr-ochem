AFRAME.registerComponent('shellatoms', {
    init: function () {
        var data = this.data;
        var el = this.el;
        var scene = document.querySelector('a-scene');

        var bondPos = el.getAttribute('position');
        var bondRot = el.getAttribute('rotation');
        var bondLength = el.getAttribute('geometry').height;

        var atomPosX = [(bondPos.x + bondLength / 2 * Math.sin(bondRot.x * Math.PI / 180.0)), (bondPos.x - bondLength / 2 * Math.sin(bondRot.x * Math.PI / 180.0))];
        var atomPosY = [(bondPos.y + bondLength / 2 * Math.cos(bondRot.y * Math.PI / 180.0)), (bondPos.y - bondLength / 2 * Math.cos(bondRot.y * Math.PI / 180.0))];
        var atomPosZ = [(bondPos.z + bondLength / 2 * Math.sin(bondRot.z * Math.PI / 180.0)), (bondPos.z - bondLength / 2 * Math.sin(bondRot.z * Math.PI / 180.0))];

        for (var i = 0; i < atomPosX.length; i++) {
            var newEntity = document.createElement('a-atom');
            newEntity.setAttribute('position', {x: atomPosX[i], y: atomPosY[i], z: atomPosZ[i]});
            newEntity.setAttribute('opacity', '0.3');
            newEntity.setAttribute('class', 'shell-obj');
            newEntity.setAttribute('event-set__enter', {_event: 'mouseenter', color: '#00FF00'});
            newEntity.setAttribute('event-set__leave', {_event: 'mouseleave', color: ''});
            scene.appendChild(newEntity);
        }
    }
});
