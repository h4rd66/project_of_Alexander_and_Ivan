"use strict";

window.fineList = {
    searchFines : searchFines
}
let DB = data.finesData;

function searchFines(searchKey) {
    const isNumber = typeof searchKey === 'string' && /^\d+$/.test(searchKey);
    const isType = typeof searchKey === 'string';

    const fine = DB.find(fine => {
        if (isNumber) {
            return fine.номер === searchKey;
        } else if (isType) {
            return fine.тип === searchKey;
        }
        else if (!fine) {
            return ["Нічого не знайдено за вказаним ключем."];
        }
    });
    return [fine];
}