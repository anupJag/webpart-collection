import * as React from 'react';
import styles from './AccordionTiles.module.scss';

export interface IAccodTileProps{
    Header : string;
    Body : any;
    key: number;
}

const AccordionTile = (props : IAccodTileProps) => {
    
    const clicked = (event) => {
        let currentElement = event.target;
        let parentElem = currentElement.parentNode;
        currentElement.classList.toggle(`${styles.active}`);
        var panelControl = currentElement.nextElementSibling;
        if(panelControl.style.maxHeight){
            panelControl.style.maxHeight = null;
            parentElem.classList.remove(`${styles.outerDivVisited}`);
        }
        else{
            panelControl.style.maxHeight = panelControl.scrollHeight + "px";
            parentElem.classList.add(`${styles.outerDivVisited}`);
        }
    };

    return(
        <div className={styles.outerDiv} key={props.key}>
            <button className={styles.accordion} onClick={clicked.bind(this)}>{props.Header}</button>
            <div className={styles.panel}>
                <p>{props.Body}</p>
            </div>
        </div>

    );
}

export default AccordionTile;