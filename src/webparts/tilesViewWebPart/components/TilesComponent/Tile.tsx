import * as React from 'react';
import styles from './Tile.module.scss';

const Tile = (props) => {
    const configurableHeight : React.CSSProperties = {};
    debugger;
    if(props.Height){
        configurableHeight.height = `${props.Height}px`
    }
    let styleDescription = props.Description ? { "display" : "block" } : { "display" : "none" };

    return(
        <div className={styles.parent} style={configurableHeight}>
            <div className={styles.container}>
                <a href={props.Link} target="_blank" style={{"height": "inherit"}}>
                    <img src={props.BackgroundImage} alt="Image" className={styles.image} />
                    <div className={styles.overlay}>
                        <p>{props.Title}</p>
                        <p style={ styleDescription }>{props.Description}</p>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Tile;
