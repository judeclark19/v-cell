import styled from "styled-components";

export const BoardContainer = styled.div`
  background-color: #5c5c5c;
  padding: 30px;
  max-width: 1380px;
`;

export const TopRow = styled.div`
  border: 1px solid lime;
  display: flex;
  justify-content: space-between;
  gap: 100px;
`;

export const Foundations = styled.div`
  display: flex;
  gap: 50px;
`;

export const Tableau = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  border: 1px solid red;
  width: 100%;
`;

export const Spot = styled.div`
  border: 2px solid gold;
  border-radius: 5px;
  height: 210px;
  width: 150px;
`;
