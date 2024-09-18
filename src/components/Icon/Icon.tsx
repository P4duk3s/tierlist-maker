import "./Icon.scss"

export type IconProps = {
    src: string
}

export const Icon: React.FC<IconProps> = props => {
    const { src } = props

    return <img className="icon-image" src={src} />
}