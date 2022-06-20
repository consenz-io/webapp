- [Set Up](#set-up)
- [Project Overview](#project-overview)
- [Data Model](#data-model)
- [Logics](#logics)
- [Features](#features)
- [Road Map](#road-map)

# 1. <a id="set-up">Set Up</a>
## 1.1. Backend
### 1.1.1. Install
```
cd backend
yarn install
```
### 1.1.2. Start server
```
yarn serve
```
## 1.2. Frontend
### 1.2.1. Install
```
cd frontend
yarn install
```
### 1.2.2. Start app
```
yarn run serve
```
## 1.3. Test functionality

# 2. <a id="project-overview">Project Overview</a>
A platform for creating agreements.<br>
The platform lets a group of people create a document that reflects the issues they agree upon<br>
and discuss the issues that are in disagreement.

The platform allows any group of people at any scale to formulate a text<br>
in a single, coherent and clear document in a transparent and democratic way.<br>
The platform enables it through a new kind of Internet discussion.<br>
Instead of spreading across countless responses,<br>
the discussion converges around a collaborative and democratic document<br>
by incorporating voting mechanisms with discussion tools.<br>
This allows distinguishment between agreed upon and controversial issues,<br>
and the process has a clear product: a text that reflects the consent of the participants.
## 2.1. <a id="technologies-overview"></a>Technologies
### Frontend
- Framework - react
- PWA Template
- Components Library - MUI
### Backend
- GraphQL API using Hasura in order to automate CRUD operations as much as possible.
- Secondary Graphql API for non-CRUD operations (e.g. for querying the cardano blockchain).
- The client isn’t going to be aware of this API, as it is going to extend the Hasura API using remote schemas.
- Users are to be managed using some third party service (e.g. auth0)
- Authentication - based on jwt flow
- Cronjobs based actions and asynchronous operations are to be implemented using some serverless technology (e.g. AWS Lambda)
### Cardano ?
## 2.2. <a id="definitions">Definitions</a>
Here you'll find terms and definitions for the app's structure and components.
- __Group__: Every user signs up as part of a group, in which they can view, comment and vote on Agreements.
- __Category__: A Group can have multiple Categories, which contain all the Agreements.
- __Agreement__: An object that covers all the relevant issues that the users can discuss, vote and agree upon.<br>
The Agreement is dynamic and changes according to the actions of the users.
- __Topic__: Sub part of the Agreement.<br>
An Agreement may have multiple Topics.
- __Section__: One issue in the Topic.<br>
A Topic may have multiple Sections.
- __Version__: Different drafts of the Agreement.<br>
An Agreement may have multiple Versions, each from a different given time.
- __Suggestion__: A Suggestion that stands to replace a Section.<br>
A Section may have multiple edit Suggestions.
- __Section Comment__: A note that represent an opinion of a user regarding a Section.<br>
A Section may have multiple Comments.
- __Suggestion Comment__: A note that represent an opinion of a user regarding a Suggestion.<br>
A Suggestion may have multiple Comments.
- __Comment on a Comment__: A note that represent an opinion of a user regarding a Comment.<br>
A Comment may have multiple Comment on Comments.
- __Discussion__: The sum of all Comments regards a Suggestion.
- __Vote__: A way for the users to express support or objection to a Suggestion without adding text.<br>
A Vote can be pro or con.<br>
A Suggestion may have multiple Votes.
- __User__: A member in the Group that may create a Section, vote in discussion, comment, etc.