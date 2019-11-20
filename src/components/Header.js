import React from 'react';


const Header = props => {

    let { pageTitle, sortDirection, sortIdeas } = props;

    return (
        <React.Fragment>

            <header className='header'>
                {pageTitle &&
                    <h1>{pageTitle}</h1>
                }
                <div className='header__actions'>
                    <span>Sort </span>
                    <button onClick={() => sortIdeas(sortDirection.title, 'title')}>{sortDirection.title} by Title </button>
                    <button onClick={() => sortIdeas(sortDirection.created, 'created')}>{sortDirection.created} by Creation Date</button>
                </div>
            </header>

        </React.Fragment>
    );
}

export default Header;