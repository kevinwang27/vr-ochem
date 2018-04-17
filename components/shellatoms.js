AFRAME.registerComponent('shellatoms', {
    init: function () {
        var data = this.data;
        var el = this.el;
        var scene = document.querySelector('a-scene');

        var bondPos = el.getAttribute('position');
        var bondRot = el.getAttribute('rotation');
        var bondLength = el.getAttribute('geometry').height;

        var atomPosX = [bondPos.x];
        var atomPosY = [bondPos.y];
        var atomPosZ = [bondPos.z];

        for (var i = 0; i < atomPosX.length; i++) {
            var newEntity = document.createElement('a-atom');
            newEntity.object3D.position.set(atomPosX[i], atomPosY[i], atomPosZ[i]);
            scene.appendChild(newEntity);
        }
    }
});
