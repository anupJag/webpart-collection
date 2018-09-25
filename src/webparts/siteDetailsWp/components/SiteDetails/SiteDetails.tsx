import * as React from 'react';
import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardTitle,
  } from 'office-ui-fabric-react/lib/DocumentCard';
import { PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Facepile, IFacepilePersona, IFacepileProps, OverflowButtonType  } from 'office-ui-fabric-react/lib/Facepile';
import styles from './SiteDetails.module.scss';
import * as strings from 'SiteDetailsWpWebPartStrings';

const siteDetails = (props) => {
    let facePileProps : IFacepileProps = {
        personas : props.Owners,
        maxDisplayablePersonas: 4,
        personaSize : PersonaSize.size40,
        overflowButtonType : OverflowButtonType.descriptive,
        getPersonaProps : (persona : IFacepilePersona) => {
            return{
                imageShouldFadeIn : true
            };
        },
        overflowButtonProps : {
            ariaLabel: 'More users'
        }
    }

    let description : string = props.Description ? props.Description : strings.SiteDescriptionNotAvailable

    return(
        <div className={styles.siteDetails}>
            <div>
                <p className={styles.header}>Site Information Details</p>
                <div className={styles.siteInfo}>
                    <div className={styles.details}>
                        <span>
                            <p className={styles.label}>Title:</p>
                        </span>
                        <span>
                            <p className={styles.title}>{props.Title}</p>
                        </span>
                    </div>
                    <div className={styles.description}>
                        <span>
                            <p className={styles.label}>Created On:</p>
                        </span>
                        <span>
                            <p className={styles.define}>{props.CreatedDate} </p>
                        </span>
                    </div>
                </div>
                <div className={styles.meetAdmins}>
                    <p style={{"margin-bottom" : "4px"}}>Meet the Admins</p>
                    <Facepile {...facePileProps} />
                </div>
                <div className={styles.buttonRow}>
                    <DefaultButton className={styles.buttonClass} text="Learn More" onClick={props.ModalClicked}/>
                    <Modal
                        isOpen={props.ModalOpen}
                        onDismiss={props.ModalDismissed}
                        isBlocking={false}
                        containerClassName={styles.modalMainContainer}
                    >
                        <div className={styles.modalheader}>
                            <span>Site Details</span>
                        </div>
                        <div className={styles.modalBody}>
                            <p>
                                {description}
                            </p>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default siteDetails;