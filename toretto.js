define(function () {
    function handleFileSelect(evt, callback) {
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.dataTransfer.files; // FileList object.
        for (var i = 0, f; f = files[i]; i++) {
            var fr = new FileReader();
            fr.addEventListener("load", function (event) {
                var textFile = event.target;
                callback(textFile.result, f);
            });
            fr.readAsText(f);
        }
    }

    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    }

    return {
        init: function (element, callback) {
            // Assuming jquery right now....
            var elements = $(element);
            var el = elements[0];
            el.addEventListener('dragover', handleDragOver, false);
            el.addEventListener('drop', function(evt){ return handleFileSelect(evt, callback); }, false);
        }
    }
});
