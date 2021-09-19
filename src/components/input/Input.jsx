import InputSection from "../InputSection/InputSection";
import "./Input.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

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
          Enter text below to send to the MasakhaNER model. The model will
          decompose the uploaded text and recognise four entities. Organisation,
          Location, Date and Person. <br /> <br /> Enter text below or upload a
          text file containing text you want like to send to the model.
        </p>
      </Header>
      <Wrapper>
        <div>
          <InputSection />
        </div>
        <div>
          {/* <History>
            <HistorySection />
          </History> */}
        </div>
      </Wrapper>
    </>
  );
};
