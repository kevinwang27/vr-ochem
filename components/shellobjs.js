AFRAME.registerComponent('shellobjs', {
    schema: {
        type: {type: 'string', default: 'bond'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        if (data.type === 'bond') {
            
        }
        var newEntity = document.createElement('a-' + data.type);

    }
});
