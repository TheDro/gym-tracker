let IconMap = {
    edit: 0xf044,
    'trash-alt': 0xf2ed,
    plus: 0xf0fe //This entry is incorrect
}
IconMap = {...IconMap,
    delete: IconMap["trash-alt"]
}

function icon(iconName) {
    let code = IconMap[iconName]
    return code === undefined ? '' : String.fromCharCode(code)
}

export {IconMap, icon}