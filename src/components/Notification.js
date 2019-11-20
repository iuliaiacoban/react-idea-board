import React from 'react';


const Notification = props => {

    let { notificationMessage, closeNotification } = props;

    return (
        <React.Fragment>
            {notificationMessage &&

                <article className='notification'>
                    <div className='notification__body'>
                        <p> {notificationMessage} </p>
                    </div>
                    <div className='notification__actions'>
                        <button onClick={closeNotification}> </button>
                    </div>
                </article>
            }
        </React.Fragment>
    );
}

export default Notification;