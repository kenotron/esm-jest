module.exports = function(loader, nameMap) {
    var BuiltinModule = loader('module');

    // Guard against poorly mocked module constructors
    var Module = module.constructor.length > 1 ? module.constructor : BuiltinModule;

    const oldResolveFilename = Module._resolveFilename;
    const oldNodeModulePaths = Module._nodeModulePaths;

    Module._resolveFilename = function(request, parent, isMain) {
        if (request.indexOf('anotherRoot') > -1) {
            console.log('aliasing ' + request);
        }

        let newRequest = request;
        Object.keys(nameMap).forEach(regex => {
            const mappedModuleName = nameMap[regex];
            const matches = request.match(regex);

            if (matches) {
                newRequest = mappedModuleName
                    .replace(/\$([0-9]+)/g, (_, index) => matches[parseInt(index, 10)])
                    .replace('<rootDir>', __dirname);
            }
        });
        return oldResolveFilename.call(this, newRequest, parent, isMain);
    };
};
