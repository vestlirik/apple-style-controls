(function () {
    var uniqueId = 0;

    function generateUniqueId() {
        return uniqueId++;
    }

    window.asc.getUniqueId = generateUniqueId;
})();