import styled from "styled-components";

const Alert = styled.div`
  align-self: center;
  margin: 0 auto;
  p {
    color: #cf6969;
    font-size: 14px;
  }
`;

interface Props {
  type: string;
}

const Toast = () => {
  return (
    <>
      <Alert>
        <p>Incorrect details, please try again</p>
      </Alert>
    </>
  );
};

export default Toast;
