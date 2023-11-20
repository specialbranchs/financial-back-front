import React from 'react'
import useChildDoronList from '../../../hooks/useChildDoron'

type Props = {
    id: number
    child: number
}
const ChildScreen = ({ id, child }: Props) => {
    const { designations } = useChildDoronList(id)

    const childs: any = designations.find((item) => item.id != 0 && item.id === child)

    return (
        <>
            {

                childs ? "(" + childs.title + ")" : ""
            }
        </>

    )
}

export default ChildScreen
