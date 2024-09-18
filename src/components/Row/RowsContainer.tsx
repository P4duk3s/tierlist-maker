import { useState } from "react"
import { Row, RowProps } from "./Row"
import "./RowsContainer.scss"

export const RowsContainer: React.FC = () => {

    const [rows, setRows] = useState<RowProps[]>([{ title: "S", id: 111 }, { title: "A", id: 222 }, { title: "B", id: 333 }, { title: "C", id: 444 }, { title: "D", id: 555 }, { title: "E", id: 666 }, { title: "F", id: 777 }])

    // console.log("rows", rows)

    const reorder = (id: number, direction: "up" | "down") => {
        const newArr = [...rows]
        const elementIdx = newArr.findIndex(v => v.id === id)
        const elementToSwapIdx = direction === "up" ? elementIdx - 1 : elementIdx + 1
        if (elementToSwapIdx < 0 || elementToSwapIdx === rows.length)
            return
        const elementToSwap = newArr[elementToSwapIdx]
        const temp = elementToSwap
        newArr[elementToSwapIdx] = newArr[elementIdx]
        newArr[elementIdx] = temp
        setRows(newArr)
    }



    return <div className="rows-container">
        {rows.map(row => (
            <Row id={row.id} title={row.title} update={reorder} key={row.id} />
        ))}
    </div>
}