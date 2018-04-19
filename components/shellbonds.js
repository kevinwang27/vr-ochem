AFRAME.registerComponent('shellbonds', {
    init: function () {
        var el = this.el;
        var scene = document.querySelector('a-scene');

        var atomPos = el.getAttribute('position');
        var atomFracRad = el.getAttribute('geometry').radius / 2;
        var bondHalfLen = 0.5;
        var lenDiag = (bondHalfLen+atomFracRad) * Math.sin(45 * Math.PI / 180.0);
        
        var bondPosArr = [
            // top bottom
            new THREE.Vector3(atomPos.x, atomPos.y+bondHalfLen+atomFracRad, atomPos.z), new THREE.Vector3(atomPos.x, atomPos.y-bondHalfLen-atomFracRad, atomPos.z),
            // right left
            new THREE.Vector3(atomPos.x+bondHalfLen+atomFracRad, atomPos.y, atomPos.z), new THREE.Vector3(atomPos.x-bondHalfLen-atomFracRad, atomPos.y, atomPos.z),
            // front back
            new THREE.Vector3(atomPos.x, atomPos.y, atomPos.z+bondHalfLen+atomFracRad), new THREE.Vector3(atomPos.x, atomPos.y, atomPos.z-bondHalfLen-atomFracRad),
            // top-right bottom-left
            new THREE.Vector3(atomPos.x+lenDiag, atomPos.y+lenDiag, atomPos.z), new THREE.Vector3(atomPos.x-lenDiag, atomPos.y-lenDiag, atomPos.z),
            // top-left bottom-left
            new THREE.Vector3(atomPos.x-lenDiag, atomPos.y+lenDiag, atomPos.z), new THREE.Vector3(atomPos.x+lenDiag, atomPos.y-lenDiag, atomPos.z)
            ];
        
        var bondRotArr = [{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:90},{x:0,y:0,z:90},{x:0,y:90,z:90},{x:0,y:90,z:90},{x:0,y:0,z:-45},{x:0,y:0,z:-45},{x:0,y:0,z:45},{x:0,y:0,z:45}];

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
            scene.appendChild(newEntity);

            newEntity.addEventListener('click', function () {
                var bond = document.createElement('a-bond');
                bond.setAttribute('position', newEntity.getAttribute('position'));
                bond.setAttribute('rotation', newEntity.getAttribute('rotation'));
                bond.setAttribute('color', 'gray');
                bond.setAttribute('class', 'placedbond');
                bond.setAttribute('shellatoms', '');

                scene.removeChild(newEntity);
                scene.appendChild(bond);
            });

            newEntity.addEventListener('hitclosest', function () {
                scene.removeChild(newEntity);
            });
        }
    }
});
