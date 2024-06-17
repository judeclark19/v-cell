# V-Cell

**Link to deployed app: [http://vcell.codecouture.site](http://vcell.codecouture.site/)**

![image](https://github.com/judeclark19/v-cell/assets/69258086/6ece0c50-7c48-4cb0-bb75-eb4f6a343a8b)

## Todo/Feature wishlist

- [ ] "Magnetic" hit boxes
- [ ] Consolidate modal closing logic
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
