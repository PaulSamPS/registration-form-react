import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface WhiteBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    children: ReactNode
}