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
  message: string;
}

const Toast = (message: Props) => {
  return (
    <>
      <Alert>
        <p>{message}</p>
      </Alert>
    </>
  );
};

export default Toast;
