import Style from "./Card.module.css"

function Card(props){
    return(<div className={Style.Card}>
        {props.children}
    </div>)
}
export default Card