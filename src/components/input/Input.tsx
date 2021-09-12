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
  transform: translateX(-65px);
  @media (max-width: 767px) {
    font-size: 2em;
  }
  text-align: left;
  margin-left: 9vw;
`;

const History = styled.div`
  background-color: white;
  display: grid;
  grid-template-columns: 65% 35%;
  flex-direction: column;
  justify-content: center;
  height: 82vh;
  width: 30vw;
  border: solid 1px #ffffff;
  margin: 0 auto;
  margin-bottom: 8vh;
  border-radius: 20px;
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  right: 2vw;

  div {
    text-align: left;
  }

  h4 {
    color: #5f5f5f;
  }
`;

export const Input = () => {
  return (
    <>
      {/* <Header>
        Below, enter text in the input field to send text to the MasashaNER
        model which will returned text with recognized entities
      </Header> */}
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
