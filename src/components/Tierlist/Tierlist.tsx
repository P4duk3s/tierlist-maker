import "./Tierlist.scss"
import { useCallback, useMemo, useRef, useState } from "react"
import { IconData } from "../../lib/Tierlist-Data"
import { Group } from "../Group/Group"
import { Icon } from "../Icon/Icon"
import { MainIconContainer } from "../MainBox/MainIconContainer"
import { Dialog } from "../Dialog/Dialog"
import { v4 } from "uuid"
import { toPng } from 'html-to-image';

export type GroupData = {
    id: string,
    title: string,
    colourIdx: number
}

type TierlistProps = {
    data: IconData[]
    titleProp?: string
}

export const Tierlist: React.FC<TierlistProps> = props => {
    const { data, titleProp } = props
    const defaultGroupList: GroupData[] = useMemo(() => {
        return [{
            id: v4(),
            title: "S",
            colourIdx: 0
        }, {
            id: v4(),
            title: "A",
            colourIdx: 1
        }, {
            id: v4(),
            title: "B",
            colourIdx: 2
        }, {
            id: v4(),
            title: "C",
            colourIdx: 3
        }, {
            id: v4(),
            title: "D",
            colourIdx: 4
        }, {
            id: v4(),
            title: "E",
            colourIdx: 5
        }, {
            id: v4(),
            title: "F",
            colourIdx: 6
        }]
    }, [])
    const [title, setTitle] = useState(titleProp || "")
    const [titleInputOpen, setTitleInputOpen] = useState(false)
    const [groupList, setGroupList] = useState(defaultGroupList)
    const [iconList, setIconList] = useState(data)
    const [dragging, setDragging] = useState(false)

    const dragItem = useRef<IconData | null>(null)
    const dragNode = useRef<EventTarget & HTMLDivElement | null>(null)
    const screenshotAreaRef = useRef<HTMLDivElement>(null)

    const { dialog, toggleDialog, closeDialog } = Dialog(setGroupList, setIconList)

    console.log("iconList", iconList)

    // useEffect(() => {
    //     const myTierlists = localStorage.getItem("tierlist")
    //     if (myTierlists) {
    //         const parsed = JSON.parse(myTierlists)
    //         const groups = parsed[0] as GroupData[]
    //         const icons = parsed[1] as IconData[]
    //         setGroupList(groups)
    //         setIconList(icons)
    //     }
    // }, [])

    const renderIcons = (groupId: string) => {
        return iconList
            .filter(item => item.group === groupId)
            .map(icon => {
                return <div
                    className={dragging && dragItem.current?.id === icon.id ? "dnd-item-current" : "dnd-item"}
                    key={icon.id}
                    draggable
                    onDragStart={e => handleDragStart(e, icon)}
                    onDragEnter={() => handleDragEnterIcon(icon)}
                    onDragOver={e => e.preventDefault()}
                >
                    <Icon src={icon.imgSrc} />
                </div>
            })
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, icon: IconData) => {
        dragItem.current = icon
        dragNode.current = e.currentTarget
        dragNode.current.addEventListener("dragend", handleDragEnd)
        setDragging(true)
        e.dataTransfer.effectAllowed = "move"
    }

    const handleDragEnd = () => {
        dragItem.current = null
        dragNode.current?.removeEventListener("dragend", handleDragEnd)
        dragNode.current = null
        setDragging(false)
    }

    const handleDragEnterContainer = (groupId: string) => {
        const currentIcon = dragItem.current
        if (!currentIcon) return

        if (iconList.find(item => item.id === currentIcon.id)?.group === groupId)
            return

        setIconList(prevList => {
            const newList = prevList.filter(item => item.id !== currentIcon.id)
            return [...newList, {
                ...currentIcon,
                group: groupId
            }]
        })

    }

    const handleDragEnterIcon = (targetIcon: IconData) => {
        // do nothing if hovering over dragged icon
        const currentIcon = dragItem.current
        if (!currentIcon || targetIcon.id === currentIcon.id) return

        const targetIdx = iconList.findIndex(item => item.id === targetIcon.id)

        setIconList(prevList => {
            const newList = [...prevList.filter(item => item.id !== currentIcon.id)]
            newList.splice(targetIdx, 0, {
                ...currentIcon,
                group: targetIcon.group
            })
            return newList
        })
    }

    const reorderGroup = (idx: number, direction: "up" | "down") => {
        setGroupList(oldList => {
            const newArr = [...oldList]
            const currentGroup = newArr[idx]
            const groupToSwapWithIdx = direction === "up" ? idx + -1 : idx + 1

            if (groupToSwapWithIdx < 0 || groupToSwapWithIdx === oldList.length)
                return oldList

            const temp = newArr[groupToSwapWithIdx]
            newArr[groupToSwapWithIdx] = currentGroup
            newArr[idx] = temp

            return newArr
        })
        closeDialog()
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & {
            files: FileList
        }
        setIconList(prevList => [...prevList, ...Array.from(target.files).map(file => {
            const newFile: IconData = {
                id: v4(),
                imgSrc: URL.createObjectURL(file),
                group: "main"
            }
            return newFile
        })])
    }

    // const saveToLocalStorage = () => {
    //     localStorage.setItem("tierlist", JSON.stringify([groupList, iconList]))
    // }

    const generateScreenshotAndDownload = useCallback(async () => {
        if (screenshotAreaRef.current === null) return

        const dataUrl = await toPng(screenshotAreaRef.current)

        const link = document.createElement('a')
        link.download = title || 'tier-list-name.png'
        link.href = dataUrl
        link.click()

    }, [screenshotAreaRef, title])

    return <div className="tierlist">
        <div className="header">
            <h2
                className="rakkas"
                onClick={() => setTitleInputOpen(prev => !prev)}
            >
                {title ? title : "Your Tier List Name"}
            </h2>

            {/* <label htmlFor="">
                give it a name
            </label> */}
            {titleInputOpen && <input
                required
                type="text"
                minLength={3}
                placeholder={"Your Tier List Name"}
                value={title}
                onChange={e => setTitle(e.target.value)}
            />}
        </div>

        <div
            className="group-list-container"
            ref={screenshotAreaRef}
        >
            {groupList.map((group, idx) => {
                return <Group
                    key={group.title + idx}
                    group={group}
                    onDragEnter={handleDragEnterContainer}
                    renderIcons={renderIcons}
                    reorderUp={() => reorderGroup(idx, "up")}
                    reorderDown={() => reorderGroup(idx, "down")}
                    toggleDialog={() => toggleDialog(idx, group)}
                />
            })}
        </div>

        {/* dialog for customising groups */}
        {dialog}

        {iconList.length ? <MainIconContainer
            onDragEnter={handleDragEnterContainer}
            renderIcons={renderIcons}
        /> : <h2 style={{ color: "white" }}>
            {"Your icons list is empty, upload images by clicking the button below :)"}
        </h2>}

        <div className="input-container">
            <input
                type="file"
                name="images"
                accept=".png, .jpg, .gif"
                multiple
                onChange={handleFileUpload}
            />
        </div>


        <div className="center">
            {/* <button
                onClick={saveToLocalStorage}
            >
                Save (to local storage)
            </button> */}
            <button
                onClick={generateScreenshotAndDownload}
            >
                Save/Download
            </button>
        </div>
    </div>
}