import "./Dialog.scss"
import { v4 } from "uuid";
import { IconData } from "../../App";
import { useEffect, useRef, useState } from "react"
import { GroupData } from "../Tierlist/Tierlist";


export const Dialog = (
    setGroupList: React.Dispatch<React.SetStateAction<GroupData[]>>,
    setIconList: React.Dispatch<React.SetStateAction<IconData[]>>
) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const outsideDivRef = useRef<HTMLDivElement>(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const currentGroupIdx = useRef<number | null>(null)
    const [selectedColour, setSelectedColour] = useState<number>(0)
    const [groupTitle, setGroupTitle] = useState<string>("")
    const [selectedGroup, setSelectedGroup] = useState<GroupData>()

    const toggleDialog = (groupIdx: number, group: GroupData) => {
        if (dialogRef.current?.open) {
            setDialogOpen(false)
            dialogRef.current?.close()
            currentGroupIdx.current = null
        }
        else {
            setDialogOpen(true)
            dialogRef.current?.show()
            currentGroupIdx.current = groupIdx
            setSelectedGroup(group)
            setSelectedColour(group.colourIdx)
            setGroupTitle(group.title)
        }
    }

    const closeDialog = () => {
        dialogRef.current?.close()
        setDialogOpen(false)
    }

    // close dialog on click outside
    useEffect(() => {
        if (!outsideDivRef.current) return

        const handleOutsideClick = (e: MouseEvent) => {
            if (e.target === outsideDivRef.current)
                closeDialog()
        }

        outsideDivRef.current.addEventListener("click", handleOutsideClick)
        return () => outsideDivRef.current?.removeEventListener("click", handleOutsideClick)

    }, [outsideDivRef])


    return {
        toggleDialog,
        closeDialog,
        dialog: <div ref={outsideDivRef} className={dialogOpen ? "blur" : ""}>
            {<dialog ref={dialogRef}>
                <button className="close" onClick={closeDialog}>
                    X
                </button>
                <div className="color-container">
                    {Array.from({ length: 12 }, (_, idx) => <div
                        key={idx}
                        className={`${selectedColour === idx ? "color selected" : "color"}`}
                        onClick={() => {
                            setSelectedColour(idx)
                            setGroupList(prevList => {
                                if (currentGroupIdx.current === null) return prevList
                                prevList[currentGroupIdx.current].colourIdx = idx
                                return prevList
                            })
                        }}
                    />)}
                </div>
                <textarea
                    value={groupTitle}
                    onChange={e => {
                        setGroupTitle(e.target.value)
                        setGroupList(prevList => {
                            if (currentGroupIdx.current === null) return prevList
                            prevList[currentGroupIdx.current].title = e.target.value
                            return prevList
                        })
                    }}
                />
                <div className="actions-container">
                    <button
                        onClick={() => {
                            setGroupList(prevList => {
                                if (currentGroupIdx.current === null) return prevList
                                const newList = [...prevList]
                                newList.splice(currentGroupIdx.current, 0, {
                                    id: v4(),
                                    title: "NEW",
                                    colourIdx: Math.floor(Math.random() * 11) + 1
                                })
                                return newList
                            })
                            closeDialog()
                        }}
                    >
                        Add a Row Above
                    </button>
                    <button
                        onClick={() => {
                            setGroupList(prevList => {
                                if (currentGroupIdx.current === null) return prevList
                                const newList = [...prevList]
                                newList.splice(currentGroupIdx.current + 1, 0, {
                                    id: v4(),
                                    title: "NEW",
                                    colourIdx: Math.floor(Math.random() * 11) + 1
                                })
                                return newList
                            })
                            closeDialog()
                        }}
                    >
                        Add a Row Below
                    </button>
                    <button
                        onClick={() => {
                            //clear out icons before deleting if there are some
                            setGroupList(prevList => {
                                if (currentGroupIdx.current === null) return prevList
                                const group = prevList[currentGroupIdx.current]
                                setIconList(prevIconList => {
                                    return prevIconList.map(icon => {
                                        if (icon.group === group.id)
                                            icon.group = "main"
                                        return icon
                                    })
                                })
                                return prevList.filter(item => item.id !== group.id)
                            })
                            closeDialog()
                        }}
                    >
                        Delete Row
                    </button>
                    <button
                        onClick={() => {
                            setIconList(prevList => {
                                return prevList.map(icon => {
                                    if (icon.group === selectedGroup?.id)
                                        icon.group = "main"
                                    return icon
                                })
                            })
                        }}
                    >
                        Clear Row Images
                    </button>
                </div>
            </dialog >}
        </div>
    }
}
