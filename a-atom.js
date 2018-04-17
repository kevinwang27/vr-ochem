AFRAME.registerPrimitive('a-atom', {
    defaultComponents: {
        sphere: {radius: 0.3},
        include-label: {text: ''}
    },

    mappings: {
        radius: 'sphere.radius',
        color: 'sphere.color',
        text: 'includ-label.text'
    }
}));
