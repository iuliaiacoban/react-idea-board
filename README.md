## Idea board
Demo: http://web.iuliaiacoban.com/idea/

### Description
Build an idea board that allows a user to create new ideas, edit existing ideas or delete them. Each idea should be represented as a tile on the board that displays a title, description and created/updated time. The title and description should be editable inline. The description text should have a max length of 140 characters. There should also be a button on the tile that allows for it to be deleted.

* Page is responsive.
* Each idea tile contains a title and description, which is editable, as well as created/updated time.
* New ideas have the title field focused to prompt user to begin typing.
* The ideas can be sorted by creation date or alphabetically.

### Stretch
* The current state uses the localStorage API to persist when the page is refreshed.
* A character countdown is added as the user is approaching the limit of their description text.
* A notification is displayed when an update is made to a tile.

## How to run the app locally
`yarn start` will run a development server on `http://localhost:3000`.
`yarn test` will run the suite of tests created.
