export default function Die(props){

    const styles ={
        backgroundColor : props.isSamee ? "greenyellow" : "white"
    }
    return(
        <div className="die-face" style={styles} onClick={props.onclick}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}