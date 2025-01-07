# Dynamic Media Institute Web App Development and UI/UX, 2025.

Background Information:
1) Dynamic Media Institute is a MassArt program or graduate students which I am a part of. 
2) It is a STEM program at the crossroads of technology, interaction and art.
3) This project stem from a redesign opportunity I had at MassArt, it serves as a page that lists people's profiles, along with illustrations my friend draw @yxuart. 
Each illustration has a personality that matched the profile photos.
4) The Sanity Schema was structured with scalability and included a space for both the profile photo and the illustration for each card.

Design and Engineering Considerations:
1) The UI cards turned out colorful due to the flat color palette used on illustrations, while this was a strength it could easily overwhelm the UI color palette.
2) To show both the illustrations and people associated, an Intersection Observer API was used, it looks for each card (forEach) and applies transform, translate X,Y and z-index based on how much of the card is visible within the viewport.
3) Each image were fetched from Sanity base, to enhance fairness (giving each person equal chance of appearing at top) and providing further user control via alphabetical sorting options.
