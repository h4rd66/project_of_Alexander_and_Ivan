"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener('click',payFine);
function payFine(){
let fineNumberValue = fineNumber.value;
let passportValue = passport.value;
let creditCardNumberValue = creditCardNumber.value;
let cvvValue = cvv.value;
let amountValue = amount.value;

let fine = DB.find(item => item.номер === fineNumberValue && item.сума === parseFloat(amountValue));
if (!fine) {
    alert("Номер не співпадає або сума не співпадає");
    return;
}
let passportPattern = /^[А-ЩЬЮЯЇІЄҐ]{2}\d{6}$/;
if (!passportPattern.test(passportValue)) {
    alert("Не вірний паспортний номер");
    return;
}
let creditCardPattern = /^\d{16}$/;
if (!creditCardPattern.test(creditCardNumberValue)) {
    alert("Не вірна кредитна картка");
    return;
}
let cvvPattern = /^\d{3}$/;
if (!cvvPattern.test(cvvValue)) {
    alert("Не вірний CVV");
    return;
}

let index = DB.findIndex(item => item.номер === fineNumberValue && item.сума === parseFloat(amountValue));
if (index !== -1) {
    DB.splice(index, 1);
    alert("Оплата пройшла успішно. Об'єкт видалено з бази даних.");
} else {
    alert("Помилка при видаленні об'єкта з бази даних.");
}
}