import React from 'react';
import { debug } from 'webpack';
import App from './App';

describe("register", () => {
  describe("with valid inputs", () => {
    it.todo('calls the onSubmit function', async () => {
      const mockOnSubmit = jest.fn()
      const {getByLabelText, getByRole} = render(<SignIn onSubmit={mockOnSubmit}/>)

      await act(async () => {
        fireEvent.change(getByLabelText("Email Address *"), {target: {value: "email@test.com"}})
        fireEvent.change(getByLabelText("Password *"), {target: {value: "1234567"}})
      })

      await act(async () => {
        fireEvent.click(getByRole("button"))
      })

      expect(mockOnSubmit).toHaveBeenCalled()
    })  
  })

  describe("with invalid email", () => {
    it.todo('renders email validation error',  async () =>{
      const {getByLabelText, container} = render(<SignIn />)

      await act(async () => {
        const emailInput = getByLabelText("Email Address *")
        fireEvent.change(emailInput, {target: {value: "invalid email"}})
        fireEvent.blur(emailInput)
      })
      expect(container.innerHTML).toMatch("Enter a valid email") 
    })  
  })

  describe("with invalid password", () => {
    it.todo('renders the password validation error', async () => {
      const {getByLabelText, container} = render(<SignIn />)

      await act(async () => {
        const paswordInput = getByLabelText("Password *")
        fireEvent.change(paswordInput, {target: {value: "123"}})
        fireEvent.blur(paswordInput) 
    })  
    expect(container.innerHTML).toMatch("Password should be longer than 6 characters")
  })
})
})
