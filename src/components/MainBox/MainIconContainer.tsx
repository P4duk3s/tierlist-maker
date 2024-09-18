import "./MainIconContainer.scss"

type DefaultIconContainer = {
    onDragEnter: (groupId: string) => void
    renderIcons: (groupId: string) => React.ReactNode
}

export const MainIconContainer: React.FC<DefaultIconContainer> = props => {
    const { onDragEnter, renderIcons } = props

    return <>
        <div
            className="main-container"
            onDragEnter={() => onDragEnter("main")}
            onDragOver={e => e.preventDefault()}
        >
            {renderIcons("main")}
        </div>
    </>
}