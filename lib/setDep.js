const version =require('./version');

module.exports = (type, depArr) => {
    var depArrJson = {};
    depArr.forEach(dep => {
        depArrJson[dep] = version[type][dep]
    });
    return depArrJson;
}