import "./Row.scss"
import { useEffect, useRef, useState } from "react"
import { Icon, IconProps } from "../Icon/Icon"
import { useDragContext } from "../DragContext/DragContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

export type RowProps = {
    id: number
    title: string
    update?: (id: number, direction: "up" | "down") => void
}

export const Row: React.FC<RowProps> = props => {
    const { id, title, update } = props
    const [icons, setIcons] = useState<IconProps[]>([])
    const { currentlyDragging, setCurrentlyDragging, parent, setParent } = useDragContext()
    const rowIdx = `idx-${id}`
    const className = `drop-container ${rowIdx}`
    const ref = useRef(null)

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        // const selfTargeted = parent && parent.classList.contains(rowIdx)
        // if (currentlyDragging && !selfTargeted) {
        //     setIcons([...icons, currentlyDragging])
        if (!currentlyDragging) return
        const event = new CustomEvent("update", {
            detail: {
                action: "remove",
                id: currentlyDragging.id,
                parent: className
            }
        })
        window.dispatchEvent(event)
        setCurrentlyDragging(null)
        setParent(null)
        // }
    }

    const handleOnDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        // console.log("leave row", e.target)
        if (ref.current === parent) return
        setIcons(icons.filter(icon => icon.id !== currentlyDragging?.id))
    }

    const handleOnDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        const elem = e.target as HTMLDivElement
        console.log("enter row", e.target, e.currentTarget)
        if (ref.current === parent) return
        currentlyDragging && setIcons([...icons, currentlyDragging])
    }

    const updateStateEventHandler = (e: any) => {
        const { id, parent } = e.detail
        if (parent !== className)
            setIcons(prev => prev.filter(icon => icon.id !== id))
    }

    useEffect(() => {
        window.addEventListener("update", updateStateEventHandler)

        return () => window.removeEventListener("update", updateStateEventHandler)
    }, [])

    return <div className="row">
        <div className="label">
            {title}
        </div>
        <div className={className} ref={ref}
            onDrop={handleOnDrop}
            onDragOver={e => e.preventDefault()}
            onDragLeave={handleOnDragLeave}
            onDragEnter={handleOnDragEnter}
        >
            {icons.map((icon, idx) => {
                return <Icon
                    key={icon.id + idx}
                    src={icon.src}
                    id={icon.id}
                />
            })}
        </div>
        <div className="config">
            <div className="vertical">
                <FontAwesomeIcon className="pointer-cursor" size="xl" icon={faChevronUp}
                    onClick={() => update && update(id, "up")}
                />
                <FontAwesomeIcon className="pointer-cursor" size="xl" icon={faChevronDown}
                    onClick={() => update && update(id, "down")}
                />
            </div>
            <FontAwesomeIcon className="pointer-cursor" size="xl" icon={faGear} />
        </div>
    </div>
}