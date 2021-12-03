import React from "react";
import SpaceCard from "./SpaceCard";

function Spaces(props) {
    return (
        <div className="spaces container">
            <h1 className="row">My spaces</h1>
            <div className="spaces-list row">
                {props.spaces.filter(space => space.isActive)
                .map(space => <SpaceCard 
                    classNames="col-3 m-1" 
                    key={space.id} 
                    img='https://p.turbosquid.com/ts-thumb/x2/EJcU7X/uy/cartoonapartmentbuilding_01_/jpg/1622731400/600x600/fit_q87/9bac5bd68fd2647d198662dcea0fccf17ebf195a/cartoonapartmentbuilding_01_.jpg' 
                    space={space}
                    onClick={() => props.detalle(space.id)}
                    />)}
            </div>
        </div>
    );
};

export default Spaces;