import React, {useCallback, useState} from 'react';
import './Form.scss'
import {validateForm} from "../utils/utils";
import {useFetching} from "../hooks/useFetching";

type InputType = {
    value: string;
    error: null | string;
}

export type FormType = {
    fullName: InputType;
    email: InputType;
    phone: InputType;
    date: InputType;
    message: InputType;
}

export enum TypeName {
    fullName = 'fullName',
    email = 'email',
    phone = 'phone',
    date = 'date',
    message = 'message'
}

const Form = () => {

    const [form, setForm] = useState<FormType>({
        fullName: {
            value: '',
            error: null
        },
        email: {
            value: '',
            error: null
        },
        phone: {
            value: '',
            error: null
        },
        date: {
            value: '',
            error: null
        },
        message: {
            value: '',
            error: null
        }
    });


    const handleForm = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm(prev => ({
            ...prev,
            [event.target.name]: {
                value: event.target.name === TypeName.phone ? mask(event.target.value) : event.target.value,
                error: validateForm(event.target.name, event.target.value)
            },
        }));
    };
    const sendForm = (event: any) => {
        event.preventDefault()

        if (Object.values(form).some(item => item.error !== null || !item.value) ) {
            console.log('error')
            return null
        }
        fetch('a').then(data => data.json()).then(data => console.log(data))
    }

    const mask = useCallback((value: string) => {
        const matrix = '+7 (___) ___ ____';
        let i = 0;
        const def = matrix.replace(/\D/g, '');
        let val = value.replace(/\D/g, '');
        if (def.length >= val.length) val = def;
        return matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });
    }, [handleForm]);

    return (
        <div className='wrapper__form'>
            <form>
                <h1>Feedback</h1>
                <div className='form__inputs'>
                    <h2>Имя Фамилия*</h2>
                    <input
                        type="text"
                        name={TypeName.fullName}
                        value={form.fullName.value.toUpperCase()}
                        onChange={handleForm}
                        onBlur={handleForm}
                        className={form.fullName.error ? "error__input" : undefined}
                        placeholder='IVAN IVANOV'
                    />
                    {form.fullName.error && <label htmlFor={TypeName.fullName}>{form.fullName.error}</label>}
                    <h2>Email*</h2>
                    <input
                        type="text"
                        name={TypeName.email}
                        value={form.email.value}
                        onChange={handleForm}
                        onBlur={handleForm}
                        className={form.email.error ? "error__input" : undefined}
                        placeholder="Email"
                    />
                    {form.email.error && <label htmlFor={TypeName.email}>{form.email.error}</label>}
                    <h2>Номер телефона*</h2>
                    <input
                        type="phone"
                        name={TypeName.phone}
                        value={form.phone.value}
                        onChange={handleForm}
                        onFocus={handleForm}
                        onBlur={handleForm}
                        className={form.phone.error ? "error__input" : undefined}
                        placeholder={'+7 (___) ___ ____'}
                    />
                    {form.phone.error && <label htmlFor={TypeName.phone}>{form.phone.error}</label>}
                    <h2>Дата рождения*</h2>
                    <input
                        type="date"
                        min="1945-01-01"
                        max='2021-12-31'
                        name={TypeName.date}
                        value={form.date.value}
                        onChange={handleForm}
                        onBlur={handleForm}
                        className={form.date.error ? "error__input" : undefined}
                    />
                    {form.date.error && <label htmlFor={TypeName.date}>{form.date.error}</label>}
                    <h2>Сообщение*</h2>
                    <textarea
                        name={TypeName.message}
                        value={form.message.value}
                        onChange={handleForm}
                        onBlur={handleForm}
                        className={form.message.error ? "error__input" : undefined}
                    />
                    {form.message.error && <label htmlFor={TypeName.message}>{form.message.error}</label>}
                </div>
                <button
                    onClick={sendForm}
                >Отправить
                </button>
            </form>
        </div>
    );
};

export default Form;