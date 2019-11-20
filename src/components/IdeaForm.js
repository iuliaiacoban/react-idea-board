import React from 'react';


const IdeaForm = props => {

    let { value, action, onChange, saveIdea } = props;

    return (
        <article className='card'>
            <div className='card__body'>
                <h2 className='card__title'>{action} Idea</h2>
                <form>
                    <div>
                        <label htmlFor='title'>Title</label>
                        <input
                            autoFocus
                            onChange={onChange}
                            type='text'
                            name='title'
                            value={value.title}
                            placeholder='Title'
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            onChange={onChange}
                            type='text'
                            name='description'
                            value={value.description}
                            placeholder='Description'
                        />
                        <p>{value.description.length < 140 ? `Remaining: ${(140 - value.description.length)} char(s)` : 'Description too long (max 140 char)'}</p>
                    </div>
                    <input
                        onChange={onChange}
                        type='hidden'
                        name='id'
                        value={value.id || ''}
                        placeholder='Id'
                    />
                </form>
            </div>
            <div className='card__actions'>
                <button onClick={saveIdea} aria-label='Save the idea'> Save </button>
            </div>
        </article >
    );
}

export default IdeaForm;
