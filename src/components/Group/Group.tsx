import "./Group.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

type Group = {
    id: string,
    title: string,
    colourIdx: number
}

type GroupProps = {
    group: Group
    onDragEnter: (groupId: string) => void
    renderIcons: (groupId: string) => React.ReactNode
    reorderUp: () => void
    reorderDown: () => void
    toggleDialog?: () => void
}

export const Group: React.FC<GroupProps> = props => {
    const { group, onDragEnter, renderIcons, reorderUp, reorderDown, toggleDialog } = props

    return <div className="dnd-group">
        <div className={`group-label-${group.colourIdx}`}>
            <span>
                {group.title}
            </span>
        </div>
        <div className="icon-container"
            onDragEnter={(e) => {
                onDragEnter(group.id)
                e.dataTransfer.effectAllowed = "move"
            }}
            onDragOver={e => e.preventDefault()}
        >
            {renderIcons(group.id)}
        </div>
        <div className="config">
            <div className="vertical">
                <FontAwesomeIcon className="pointer-cursor" size="xl" icon={faChevronUp}
                    onClick={reorderUp}
                />
                <FontAwesomeIcon className="pointer-cursor" size="xl" icon={faChevronDown}
                    onClick={reorderDown}
                />
            </div>
            <FontAwesomeIcon className="pointer-cursor" size="xl" icon={faGear}
                onClick={() => toggleDialog && toggleDialog()}
            />
        </div>
    </div>
}