import React from 'react';


const Idea = props => {

    let { idea, editIdea, removeIdea } = props;

    return (
        <article className='card'>
            <div className='card__body'>
                <h2 className='card__title'>{idea.title}</h2>
                <p className='card__description'>{idea.description}</p>
                <p className='card__info'>
                    {`Created: ${new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' })
                        .format(new Date(idea.created))}`}
                </p>
                {idea.updated &&
                    <p className='card__info'>Updated: {new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' })
                        .format(new Date(idea.updated))} </p>
                }
            </div>
            <div className='card__actions'>
                <button onClick={() => editIdea(idea.id)} aria-label='Edit the idea'> Edit </button>
                <button onClick={() => removeIdea(idea.id)} aria-label='Remove the idea'> Remove </button>
            </div>
        </article >
    );
}

export default Idea;