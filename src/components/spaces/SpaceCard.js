function SpaceCard(props) {
    return (
        <div onClick={props.onClick} className={"space-card card " + props.classNames}>
            <img className="card-img-top"
                src={props.img} alt={"Picture of " + props.space.name}
            />
            <div className="card-body">
                <h5 className="card-title">{props.space.name}</h5>
                <p className="card-text">{props.space.address}</p>
            </div>
        </div>
    );
}

export default SpaceCard;