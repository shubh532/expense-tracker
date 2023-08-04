import Style from "./Message.module.css"

function Message(props) {
    return (
        <div className={Style.messageContainer}>
            <h3>{props.message}</h3>
        </div>
    )
}

export default Message