AFRAME.registerComponent('menulabel', {
    schema: {
        text: {type: 'string', default: ''}
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        var textEntity = document.createElement('a-text');
        textEntity.setAttribute('value', data.text);
        textEntity.setAttribute('position', '0 0 ' + el.getAttribute('geometry').depth);
        textEntity.setAttribute('color', '#000');
        el.appendChild(textEntity);
    }
});
