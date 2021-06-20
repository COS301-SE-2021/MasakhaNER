import { fireEvent, getByRole, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import Login from "./components/login/Login";

describe('Login', () => {
  describe('with valid inputs', () => {
    it('calls the onSubmit function', async () => {
      const mockOnSubmit = jest.fn();
      const {getByLabelText, getByRole} = render(<Login onSubmit={mockOnSubmit}/>)

      await act(async () => {
        fireEvent.change(getByLabelText("email *"), {target: {value: "test@test.co.za"}});
        fireEvent.change(getByLabelText("password *"), {target: {value: "test"}});
      })
      await act(async() => {
        fireEvent.click(getByRole("button"))
      })
      expect(mockOnSubmit).toHaveBeenCalled();
    })
  })

  describe('with invalid email', () => {
    it("renders the email validation error", async () => {
      const {getByLabelText, container} = render(<Login />)

      await act(async () => {
        const emailInput = getByLabelText("email *")
        fireEvent.change(emailInput, {target: {value: "invalid password or email"}})
        fireEvent.blur(emailInput)
      })

      expect(container.innerHTML).toMatch("invalid password or email")
    })
  })

  describe('with invalid password', () => {
    it("renders the password validation error", async () => {
      const {getByLabelText, container} = render(<Login />)

      await act(async () => {
        const paswordInput = getByLabelText("password *")
        fireEvent.change(paswordInput, {target: {value: "test"}})
        fireEvent.blur(paswordInput)
      })

      expect(container.innerHTML).toMatch("invalid password or email")

    })
  })
  
})
