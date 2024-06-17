# V-Cell

**Link to deployed app: [http://vcell.codecouture.site](http://vcell.codecouture.site/)**

## How to play:
There are three main areas on the board:
1. **The Foundations**
2. **The Tableau**
3. **The Free Cells**

**Foundations:**  The main objective of the game is to get all of the cards stacked in
                sequence in the foundations, starting with Aces and continuing
                all the way through Kings. There are four (4) Foundations,
                one for each suit.

**Tableau:**  The Tableau consists of seven (7) columns with seven (7) cards
                each, randomly shuffled at the beginning of each game.
               Click and drag cards to rearrange
                them into sequences of decreasing value and alternating suits.
                Multiple cards can be moved simultaneously if they are part of a
                correctly stacked sequence.

**Free Cells:** You have five (5) free cells,
                three of which are randomly populated when the game starts.
                The free cells can contain any where from 0 to 5 cards at any
                given time and are used to strategically store cards from the
                tableau as you build your sequential stacks.

## Three different themes to enjoy:

![image](https://github.com/judeclark19/v-cell/assets/69258086/da172890-e48e-4dd1-997b-a79ca2bc204d)



## Todo/Feature wishlist

- [ ] "Magnetic" hit boxes
- [ ] Consolidate modal logic
- [ ] Dyanmic card sizes
- [ ] Suggest next move
- [ ] Extra difficulty: foundations can be played from or not for difficulty

## Build warnings to fix

6:52:57 AM: ./components/Board/Board.tsx
6:52:57 AM: 78:6 Warning: React Hook useEffect has an unnecessary dependency: 'appState.winCount'. Either exclude it or remove the dependency array. Outer scope values like 'appState.winCount' aren't valid dependencies because mutating them doesn't re-render the component. react-hooks/exhaustive-deps
6:52:57 AM: 103:6 Warning: React Hook useEffect has a missing dependency: 'setCardSize'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
6:52:57 AM: ./components/Modals/HighScoresModal.tsx
6:52:57 AM: 72:6 Warning: React Hook useEffect has a missing dependency: 'getWins'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
6:52:57 AM: 76:6 Warning: React Hook useEffect has a missing dependency: 'getWins'. Either include it or remove the dependency array. react-hooks/exhaustive-deps
