(function () {
    var templateFiles = [];

    function getLocalFile(url) {
        return new Promise(function (resolve, reject) {
            var cachedTemplate = templateFiles.find(function (value) {
                return value.url === url
            });
            if (cachedTemplate) {
                resolve(cachedTemplate.template);
                return;
            }

            function makeHttpObject() {
                try {
                    return new XMLHttpRequest();
                }
                catch (error) {
                    console.error(err);
                }
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (error) {
                    console.error(err);
                }
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (error) {
                    console.error(err);
                }

                throw new Error("Could not create HTTP request object.");
            }

            try {
                var request = makeHttpObject();
                request.open("GET", url, true);
                request.send(null);
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        if (request.status === 200) {
                            templateFiles.push({
                                url: url,
                                template: request.responseText
                            });
                            resolve(request.responseText);
                        } else {
                            reject("Error", request.statusText);
                        }
                    }
                };
            } catch (error) {
                console.error(err);
                reject(error);
            }
        });
    }

    window.asc.getLocalFile = getLocalFile;
})();