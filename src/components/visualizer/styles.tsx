import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: 0px auto;
  max-width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const Chart = css`
  margin-top: 10px;
  width: 56px;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 420px) {
    width: 34px;
  }
`;

export const Number = styled.span`
  font-size: 1rem;
  text-align: center;
  color: ${(props) => props.color};
`;

export const MakeBar = styled.div`
  /* background-image: linear-gradient(
    to bottom,
    #69e073, 
    rgb(28, 95, 34)
  ); */
  background-color: rgb(28, 95, 34);
  ${Chart};
`;

export const BlackLine = styled.div`
  margin: 0px auto auto;
  width: 100%;
  height: 5px;
  background-color: grey;
`;
