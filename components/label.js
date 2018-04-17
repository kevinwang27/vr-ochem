AFRAME.registerComponent('label', {
    schema: {
        text: {type: 'string', default: 'C'}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        var textEntity = document.createElement('a-text');        
        textEntity.setAttribute('value', data.text);
        textEntity.setAttribute('position', '0 0 ' + el.getAttribute('geometry').radius);
        textEntity.setAttribute('color', '#000');
        el.appendChild(textEntity);
    }
});
