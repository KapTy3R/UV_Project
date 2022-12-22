export const compareValues = (arr1:Array<string>, arr2:Array<string>):boolean => {
    const getDefaultView = (arr:Array<string>) => arr
        .join('')
        .replace(/ /g,'')
        .replace(/ё/g, 'е')
        .toUpperCase();

    return getDefaultView(arr1) === getDefaultView(arr2);
};