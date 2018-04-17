AFRAME.registerComponent('shellbonds', {
    init: function () {
        var el = this.el;
        var scene = document.querySelector('a-scene');

        var atomPos = el.getAttribute('position');

        var bondPosX = [];
        var bondPosY = [];
        var bondPosZ = [];

        var newEntity = document.createElement('a-bond');

    }
});
