const Card = ({title,desc}) => {
    return(
        <div className='card'>
            <h2>{title}</h2>
            <hr></hr>
            <p>{desc}</p>
        </div>)

}

export default Card