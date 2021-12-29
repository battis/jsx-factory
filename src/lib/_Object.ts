const _Object = {

    excludeProperties: (
        object: { [key: string]: any },
        exclude: string[] | RegExp
    ) => {
        return Object.keys(object)
            .filter(
                (key) =>
                    (exclude instanceof RegExp && !exclude.test(key)) ||
                    (Array.isArray(exclude) && !exclude.includes(key))
            )
            .reduce((filteredObject, key) => {
                filteredObject[key] = object[key];
                return filteredObject;
            }, {});
    },

    includeProperties: (
        object: { [key: string]: any },
        include: string[] | RegExp
    ) => {
        return Object.keys(object)
            .filter(
                include instanceof RegExp
                    ? (key) => include.test(key)
                    : (key) => include.includes(key)
            )
            .reduce((filteredObject, key) => {
                filteredObject[key] = object[key];
                return filteredObject;
            }, {});
    },

    transformPropertyNames: (
        object: { [key: string]: any },
        transformation: (key: string) => string
    ) => {
        return Object.keys(object).reduce((transformedObject, key) => {
            transformedObject[transformation(key)] = object[key];
            return transformedObject;
        }, {});
    }
}
export default _Object;
