AFRAME.registerComponent('atomlabel', {
    schema: {
        text: {type: 'string', default: 'C'}
    },

    update: function () {
        var data = this.data;
        var el = this.el;

        var textEntity = document.createElement('a-text');
        textEntity.setAttribute('id', 'text');
        textEntity.setAttribute('value', data.text);
        textEntity.setAttribute('align', 'center');
        textEntity.setAttribute('position', '0 0 ' + el.getAttribute('geometry').radius);
        textEntity.setAttribute('color', '#000');
        el.appendChild(textEntity);
    },

    remove: function () {
        this.el.removeChild(this.el.querySelector('#text'));
    }
});
