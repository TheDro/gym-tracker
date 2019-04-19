import * as applicationSettings from 'tns-core-modules/application-settings'

function saveObject(key, obj) {
    applicationSettings.setString(key, JSON.stringify(obj))
}

function loadObject(key, defaultValue = {}) {
    let objAsString = applicationSettings.getString(key)
    if (!objAsString) {
        return defaultValue
    }
    try {
        let obj = JSON.parse(objAsString)
        return obj
    } catch (e) {
        console.error('Unable to parse stored object.', e)
        return defaultValue
    }
}

export {saveObject, loadObject}