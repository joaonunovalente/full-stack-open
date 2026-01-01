const Notification = ({errorMessage}) => {
    if (errorMessage === null){
        return
    }
    
    return(
        <p className="notification">
            {errorMessage}
        </p>
    )
}

export default Notification