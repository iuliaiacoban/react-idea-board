import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IdeaForm from './components/IdeaForm';
import Idea from './components/Idea';
import Notification from './components/Notification';
import './assets/styles/app.scss';

const mockData = [
    {
        id: 15266888,
        title: 'My first idea',
        description: 'Nullam a justo vitae leo hendrerit imperdiet.',
        created: "2019-11-12T09:17:52.651Z",
        updated: null
    },
    {
        id: 25548956,
        title: 'My second idea',
        description: 'Mauris dictum ligula quis maximus dictum. ',
        created: "2019-11-12T09:22:47.651Z",
        updated: null
    },
    {
        id: 2423576,
        title: 'My third idea',
        description: 'Nunc vehicula vestibulum augue nec egestas.Mauris dui dui, venenatis eu elit vitae, lacinia molestie urna.Sed rhoncus interdum vehicula.',
        created: "2019-11-12T09:05:47.651Z",
        updated: null
    },
    {
        id: 223234,
        title: 'My idea',
        description: 'Aenean at nunc sit amet urna fermentum aliquam eget eget nibh.Sed nec posuere velit.',
        created: "2019-11-12T12:42:47.651Z",
        updated: null
    }
];

const App = () => {
    const pageTitle = 'My Idea Board';
    const [ideas, setIdeas] = useState(!localStorage.getItem('ideas') ? mockData : JSON.parse(localStorage.getItem('ideas')));
    const [idea, setIdea] = useState({ title: '', description: '' });
    const [notificationMessage, setNotificationMessage] = useState('');
    const [action, setAction] = useState('Add');
    const [sortDirection, setSortDirection] = useState({ title: 'Ascending', created: 'Ascending' });


    useEffect(() => {
        document.title = `Iulia Iacoban | ${pageTitle}`;
    });

    const openNotification = message => {
        setNotificationMessage(message);
    };

    const closeNotification = () => {
        setNotificationMessage('');
    }

    const updateIdeasStorage = newIdeas => {
        localStorage.setItem('ideas', JSON.stringify(newIdeas));
    };

    const editIdea = id => {
        setAction('Edit');
        const filteredIdea = [...ideas].filter(idea => idea.id === id);
        setIdea(filteredIdea[0]);
    };

    const removeIdea = id => {
        const filteredIdeas = [...ideas].filter(idea => idea.id !== id);
        setIdeas(filteredIdeas);
        updateIdeasStorage(filteredIdeas);
        setIdea({ title: '', description: '' });
        openNotification(`Item removed!`)
    };

    const onChange = e => {
        setIdea({ ...idea, [e.target.name]: e.target.value });
    }

    const validateNotEmptyForm = (object) => {
        const invalidFields = [];
        Object.keys(object).forEach(key => {
            if (!object[key]) {
                invalidFields.push(key);
            }
        });
        return invalidFields;
    }

    const validateMAxLengthDescription = (description) => {
        return description.length > 140;
    };

    const saveIdea = e => {
        e.preventDefault();
        let prevIdeas = [...ideas];
        const newIdea = { title: idea.title, description: idea.description };

        // check if form is valid
        const invalidEmptyFields = validateNotEmptyForm(newIdea);
        const maxLengthDescription = validateMAxLengthDescription(newIdea.description);

        if (invalidEmptyFields.length > 0 || maxLengthDescription) {
            const invalidEmptyFieldsError = invalidEmptyFields.length > 0 ? `The following field(s) cannot be empty: ${(invalidEmptyFields.join(', ').replace(/, ([^,]*)$/, ' and $1'))}. ` : '';
            const maxLengthDescriptionError = maxLengthDescription ? 'Description too long (max 140 char).' : '';
            const formError = invalidEmptyFieldsError + maxLengthDescriptionError;
            openNotification(formError);
            return;
        }

        // if idea has prop id then update the item; if there is no id, then the item is created
        if (idea.id) {
            prevIdeas = [...ideas].filter(item => item.id !== idea.id);
            newIdea.id = idea.id;
            newIdea.updated = new Date();
            newIdea.created = idea.created;
            openNotification(`${idea.title} updated!`)
        } else {
            newIdea.created = new Date();
            newIdea.id = Date.now();
            openNotification(`${idea.title} created!`)
        }

        setIdeas([...prevIdeas, newIdea]);
        updateIdeasStorage([...prevIdeas, newIdea]);
        setIdea({ title: '', description: '' });
        setAction('Add');
    };

    const sortIdeas = (direction, key) => {

        const sortedIdeas = [...ideas];
        
        switch (key) {
            case 'title':
                sortedIdeas.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
                break;
            case 'created':
                sortedIdeas.sort(function (a, b) { return new Date(a.created).getTime() - new Date(b.created).getTime() });
                break;
            default:
                sortedIdeas.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
        }

        if (direction === 'Descending') {
            sortedIdeas.reverse();
        }

        // change sort direction
        setSortDirection(prevState => ({
            ...prevState,
            [key]: prevState[key] === 'Ascending' ? 'Descending' : 'Ascending'
        }))

        setIdeas(sortedIdeas);

    }

    return (
        <>
            <Header pageTitle={pageTitle} sortDirection={sortDirection} sortIdeas={sortIdeas} />
            <Notification notificationMessage={notificationMessage} closeNotification={closeNotification} />
            <section className="card-container">
                <IdeaForm
                    value={idea}
                    action={action}
                    onChange={onChange}
                    saveIdea={saveIdea}
                />
            </section>
            <section className="card-container">
                {ideas.map((idea, key) => (
                    <Idea idea={idea} key={idea.id} removeIdea={removeIdea} editIdea={editIdea} />
                ))}
            </section>
        </>
    );

}

export default App;
