import {TypeName} from "../components/Form";

export const validateForm = (type: string, value: string) => {

    const reEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const reFullName = /^\b[A-Z]{3,30}\b\s\b[A-Z]{3,30}\b$/gm;
    const reLat = /[А-Я]/g

    if (!value) {
        return 'Не может быть пустым'
    }

    switch (type) {
        case TypeName.fullName:
            if (value.length < 3 || value.length > 30) {
                return 'Минимальная длина каждого слова 3 символа';
            } else if (reLat.test(String(value).toUpperCase())) {
                return 'Только латинские буквы'
            } else if (!reFullName.test(String(value).toUpperCase())) {
                return 'Формат записи "IVAN IVANOV" '
            }
            return null
        case TypeName.email:
            if (!reEmail.test(String(value).toLowerCase())) {
                return 'example@gmail.com'
            }
            return null
        case TypeName.phone:
            if(value.length !== 17) {
                return 'Введите полностью номер'
            }
            return null
        case TypeName.date:
            if(value < '1945-01-01') {
                return 'Неверная дата рождения'
            } else if (value > '2021-12-31') {
                return 'Неверная дата рождения'
            }
            return null
        case TypeName.message:
            if(value.length < 10) {
                return 'Минимальная длина сообщения 10 символов'
            } else if (value.length > 300) {
                return 'Максимальная длина сообщения 300 символов'
            }
            return null
        default:
            return null;
    }
};