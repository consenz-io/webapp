- Set Up
  - [Backend](./backend/README.md)
  - [Frontend](./frontend/README.md)
- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Definitions](#definitions)
- [Contributing](#contributing)

# 1. <a id="project-overview">Project Overview</a>

A platform for creating agreements.  
The platform lets a group of people create a document that reflects the issues they agree upon  
and discuss the issues that are in disagreement.

The platform allows any group of people at any scale to formulate a text  
in a single, coherent and clear document in a transparent and democratic way.  
The platform enables it through a new kind of Internet discussion.  
Instead of spreading across countless responses,  
the discussion converges around a collaborative and democratic document  
by incorporating voting mechanisms with discussion tools.  
This allows distinguishment between agreed upon and controversial issues,  
and the process has a clear product: a text that reflects the consent of the participants.

# 2. <a id="technologies">Technologies</a>

## 2.2. Frontend

- Framework - react
- PWA Template
- Components Library - MUI

## 2.2. Backend

- GraphQL API using Hasura in order to automate CRUD operations as much as possible.
- Users are to be managed using some third party service (e.g. auth0)
- Authentication - based on jwt flow
- Cronjobs based actions and asynchronous operations are to be implemented using some serverless technology (e.g. AWS Lambda)

# 3. <a id="definitions">Definitions</a>

Here you'll find terms and definitions for the app's structure and components.
- __Group__: Every user signs up as part of a group, in which they can view, comment and vote on Sections.
- __Category__: A Group can have multiple Categories, which contain all the Agreements.
- __Agreement__: An object that covers all the relevant issues that the users can discuss, vote and agree upon.<br>
The Agreement is dynamic and changes according to the actions of the users.
- __Agreement Draft__: A document that contain all the Approved Sections of the Agreement.
An Agreement have one draft. 
- __Agreement Previews Draft__: Different drafts of the Agreement.
An Agreement may have multiple Previews Drafts, each from a different given time.
- __Chapter__: Sub part of the Agreement.<br>
An Agreement may have multiple Chapters.
- __Section__: One issue in the Chapter.<br>
A Chapter may have multiple Sections. 
- __Section Version__: Replecable texts of a section.<br>
A Section may have multiple Versions, each from a different given time.
- __Section Status__: A variable that determine the reletion of a Section Version to the Agreement Draft.
A section status can be "In a Vote" or "Approved" Or "Denied". 
"In a Vote" Section are part of the Agreement but not of the Agreement Draft.
"Approved" Section are part of the Agreement Draft.
"Denied" Section in not in the Agreement neither in the Draft, but archived.
- __Section Suggestion__: A Section that is "in a vote" status.<br>
- __Section Improvement Suggestion__: A Suggestion that stands to replace a Section Version.<br>
A Section Version may have multiple Improvement Suggestion.
- __Approved Section__: A Section Version that is in "approved" status. A Section may have one Approved Version.
- __Section Comment__: A note that represent an opinion of a user regarding a Section.<br>
A Section may have multiple Comments.
- __Version Comment__: A note that represent an opinion of a user regarding a Section Version.<br>
A Section Version may have multiple Comments.
- __Comment on a Comment__: A note that represent an opinion of a user regarding a Comment.<br>
A Comment may have multiple Comment on Comments.
- __Discussion__: The sum of all Comments regards a Section.
- __Vote__: A way for the users to express support or objection to a Suggestion without adding text.<br>
A Vote can be pro or con.<br>
A Suggestion may have multiple Votes.
- __User__: A member in the Group that may create a Section, vote in discussion, comment, etc.

# 4. <a id="contributing">Contributing</a>

This project has a CI/CD pipeline.  
Pushes to dev automatically update the staging site at https://stage.consenz.io  

## 4.1. Work Process

Create new branches from dev, and merge back into dev.  
