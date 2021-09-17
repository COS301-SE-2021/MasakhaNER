import InputSection from "../InputSection/InputSection";
import "./Input.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import HistorySection from "../history/HistorySection";

const Wrapper = styled.div`
  background-color: white;
  display: grid;
  grid-template-columns: 65% 35%;
  flex-direction: column;
  justify-content: center;
  height: 90vh;
  width: 90vw;
  border: solid 1px #ffffff;
  margin: 0 auto;
  margin-top: 8vh;
  margin-bottom: 8vh;
  border-radius: 20px;
  /* box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.2); */
  padding: 2rem;

  div {
    text-align: left;
  }
`;

const Header = styled.h1`
  font-size: 1.3em;
  margin-bottom: 1em;
  width: 70vw;
  transform: translate(-20px, 60px);
  @media (max-width: 767px) {
    font-size: 2em;
  }
  text-align: left;
  margin-left: 9vw;
  h1 {
    opacity: 0.7;
    color: #1c5f22;
  }
`;

export const Input = () => {
  return (
    <>
      <Header>
        <h1>Named Entity Recognition</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
          tincidunt feugiat sapien vel iaculis. Nulla fringilla lacus ex, non
          sagittis neque commodo sit amet. Maecenas consectetur fringilla
          dignissim. Integer iaculis venenatis ante sed euismod. Quisque vitae
          pulvinar purus. Ut bibendum volutpat fringilla.
        </p>
      </Header>
      <Wrapper>
        <div>
          <InputSection />
        </div>
        <div></div>
      </Wrapper>
    </>
  );
};
