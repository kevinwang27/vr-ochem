AFRAME.registerComponent('shellbonds', {
    init: function () {
        var data = this.data;
        var el = this.el;

        var atomPos = el.getAttribute('position');
        
        var bondPosX = [];
        var bondPosY = [];
        var bondPosZ = [];

        var newEntity = document.createElement('a-bond');

    }
});
