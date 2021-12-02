import {Button, DropDown, Header, Input, WhiteBlock} from '../components'
import React, {useEffect, useState} from 'react'
import styles from './Form.module.scss'
import cn from 'classnames'

export const Form = (): JSX.Element => {
    /*
        * не стоит заводить кучу useState ради одной маленькой формы
     */
    const [name,setName] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [phone,setPhone] = useState<string>('')
    const [nameDirty,setNameDirty] = useState<boolean>(false)
    const [emailDirty,setEmailDirty] = useState<boolean>(false)
    const [phoneDirty,setPhoneDirty] = useState<boolean>(false)
    const [nameError,setNameError] = useState<string>('Имя не может быть пустым' /* подобное выносим в константу */)
    const [emailError,setEmailError] = useState<string>('Email не может быть пустьм')
    const [phoneError,setPhoneError] = useState<string>('Номер телефона не может быть пустым')
    const [activeCheck,setActiveCheck] = useState<boolean>(false)
    const [formValid,setFormValid] = useState<boolean>(false)

    useEffect(() => { // эффекты стоит размещать в конце кода перед return
        if (nameError || emailError || phoneError || !activeCheck) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    },[nameError,emailError,phoneError,activeCheck])

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        // паттерны regexp должны быть явно не здесь
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email')
        } else {
            setEmailError('')
        }
    }

    const nameHandler = (e: any) => {
        setName(e.target.value.replace(/[^a-zA-Zа-яА-ЯЁё -]/g,''))
        const re = /^[А-Яа-яЁёa-zA-Z\s-]+$/g
        if (!re.test(String(e.target.value))) {
            setNameError('Некорректное имя')
        } else {
            setNameError('')
        }
    }

    const phoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value.replace(/[^-0-9 ()+]/g,''))
        const re =  /^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/g
        if (!re.test(String(e.target.value).toString())) {
            setPhoneError('Некорректный номер телефона')
        } else {
            setPhoneError('')
        }
    }

    const handleActive = () => {
        setActiveCheck(!activeCheck)
    }

    const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
            case 'phone':
                setPhoneDirty(true)
                break
            case 'checkbox':
                setPhoneDirty(true)
        }
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        if (!formValid) {
            e.preventDefault()
        }
    }

    return (
        <form className={styles.form} onSubmit={(e) => submitHandler(e)}>
            <WhiteBlock>
                <Header/>
                <div className={styles.name}>
                    <label className={styles.labelName}>Имя</label>
                    <Input
                        className={styles.inputName}
                        name='name'
                        placeholder='Введите Ваше имя'
                        type="text"
                        onChange={(e) => nameHandler(e)}
                        onBlur={(e) => blurHandler(e)}
                        value={name}
                    />
                    {(nameDirty && nameError) && <div className={styles.errorName}>{nameError}</div>}
                </div>
                <div className={styles.email}>
                    <span className={styles.labelEmail}>Еmail</span>
                    <Input
                        name='email'
                        placeholder='Введите ваш email'
                        className='input'
                        onChange={(e) => emailHandler(e)}
                        onBlur={(e) => blurHandler(e)}
                        value={email}
                    />
                    {(emailDirty && emailError) && <div className={styles.errorEmail}>{emailError}</div>}
                </div>
                <div className={styles.phone}>
                    <span className={styles.labelPhone}>Номер телефона</span>
                    <Input
                        name='phone'
                        placeholder='Введите номер телефона'
                        className='input'
                        onChange={(e) => phoneHandler(e)}
                        onBlur={(e) => blurHandler(e)}
                        value={phone}
                    />
                    {(phoneDirty && phoneError) && <div className={styles.errorPhone}>{phoneError}</div>}
                </div>
                <span className={styles.label}>Язык</span>
                <DropDown/>
                <div className={styles.wrapperCheckBox}>
                    <input
                        type='checkbox'
                        className={styles.checkBox}
                        checked={activeCheck}
                        name='checkbox'
                    />
                        <span onClick={handleActive}></span>
                    <div className={styles.conditions}>Принимаю <span>условия</span> использования</div>
                </div>
                <Button type='submit' onClick={() => console.log('send')} disabled={!formValid} className={cn(styles.disableBtn, {
                    [styles.activeBtn]: formValid
                })}/>
            </WhiteBlock>
        </form>
    )
}
