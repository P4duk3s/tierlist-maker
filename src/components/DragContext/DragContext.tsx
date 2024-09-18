import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"
import { IconProps } from "../Icon/Icon"


type DragContextProviderProps = {
    children: React.ReactNode
}

type DragContextProps = {
    currentlyDragging: IconProps | null
    setCurrentlyDragging: Dispatch<SetStateAction<IconProps | null>>
    parent: HTMLElement | null
    setParent: Dispatch<SetStateAction<HTMLElement | null>>
}

const DragContext = createContext<DragContextProps | null>(null)

export const DragContextProvider: React.FC<DragContextProviderProps> = props => {
    const { children } = props
    const [currentlyDragging, setCurrentlyDragging] = useState<IconProps | null>(null)
    const [parent, setParent] = useState<HTMLElement | null>(null)


    return <DragContext.Provider value={{
        currentlyDragging, setCurrentlyDragging,
        parent, setParent
    }}>
        {children}
    </DragContext.Provider>
}

export const useDragContext = () => {
    const ctx = useContext(DragContext)
    if (!ctx) throw new Error("Wrap in DragContextProvider!")
    return ctx
}