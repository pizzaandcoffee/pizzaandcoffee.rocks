(function($, w, undefined) {

    var sequences = {
        konami: '↑ ↑ ↓ ↓ ← → ← → b a',
        cross: 'up down left right',
        circle: 'left up right down'
    };

    var eggs = {
        konami: function() {
            w.alert("konami")
        },
        cross: function() {
            w.alert("cross")
        },
        circle: function() {
            w.alert("circle")
        }
    }

    w.cheet(sequences.konami, eggs.konami);
    w.cheet(sequences.cross, eggs.cross);
    w.cheet(sequences.circle, eggs.circle);
    
}(jQuery, window));
