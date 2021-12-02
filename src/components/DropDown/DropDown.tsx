import {DropDownProps} from './DropDown.props'
import {useState} from 'react'
import {ILang} from './lang.interface'
import cn from 'classnames'
import styles from './DropDown.module.scss'

const lang: ILang[] = [
    {id: 0, name: 'Русский'},
    {id: 1, name: 'Английский'},
    {id: 2, name: 'Китайский'},
    {id: 3, name: 'Испанский'},
]

export const DropDown = ({className}: DropDownProps): JSX.Element => {
    const [modal, setModal] = useState<boolean>(false)
    const [item, setItem] = useState<number>(0)
    const activeLang = lang.map(l => l.name)

    const handleShowModal = () => {
        setModal(!modal)
    }

    const onSelect = (index: number) => {
        setItem(index)
        setModal(false)
    }

    return (
        <div className={cn(styles.dropDown, className)}>
            <span className={cn(styles.selectedLang ,{
                [styles.active]: modal
            })} onClick={handleShowModal}>
                {activeLang[item]}
                {/* эта svg должна быть в отдельном файле, если с ней не производится манипуляций */}
                <svg
                    width="16"
                    height="9"
                    viewBox="0 0 16 9"
                    fill="#0880AE"
                    xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L8.70711 8.70711C8.31658 9.09763 7.68342 9.09763 7.29289 8.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579Z"/>
                </svg>
            </span>
            {modal &&
            <div className={styles.modal}>
                {/* стоит поработать над стилем кода, почитать как работают линтеры и зачем все это нужно */}
                {lang.map((l , index)=> <li key={l.id} className={styles.item} onClick={() => onSelect(index)}>{l.name}</li>)}
            </div>}
        </div>
    )
}
