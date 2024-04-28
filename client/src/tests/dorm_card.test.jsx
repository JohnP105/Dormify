/*
* Use `npm run test` to run test scripts ending in .test.js
* */

// Import the render function from @testing-library/react
import { test, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import HouseSelection from '../components/housing_selection/house_selection.jsx';
import { JSDOM } from 'jsdom';
import {useState} from "react";
import dormData from "../components/compare_housing/dorm_pictures.jsx";
import DormCard from "../components/housing_selection/dorm_card.jsx";


test('test cases are working properly', async () => {

  expect(true).toBeTruthy()

});


describe("Testing out rendering with this", () => {
  it("should render correctly without error", () => {
    render(<HouseSelection />);
  })
})


test("test if cards get selected correctly when clicked by user", async () => {
  render(<HouseSelection />);
  const { component } = await render(() => <HouseSelection />);
  // expect(await screen.findByTestId('div', { name: 'Click me!' }));
  // expect(component).toBeInTheDocument();
  // Render the HouseSelection component

  // Simulate clicking on the DormCard components
  fireEvent.click(screen.getByTestId("Card 1"));
  expect(screen.getByTestId("Card 1-checkbox").checked).toEqual(true) // Checks to see if the card that was selected is now true

  // Deselect that card
  fireEvent.click(screen.getByTestId("Card 1"));
  // Card 1's checkbox should now be false
  expect(screen.getByTestId("Card 1-checkbox").checked).toEqual(false)

  // Select multiple cards now - click them. they should now be checked
  dormData.forEach((value, index, array) => {
    console.log(`Clicking on card index of ${index}`)
    fireEvent.click(screen.getByTestId("Card "+index));
  })
  // Check to see that the cards that were clicked on now have their checkboxes checked true
  dormData.forEach((value, index, array) => {
    console.log(`Expecting card index of ${index} to have checked value of true`)
    expect(screen.getByTestId(`Card ${index}-checkbox`).checked).toEqual(true)
  })

  // Select multiple cards now - click them. they should be unchecked be this operation
  dormData.forEach((value, index, array) => {
    console.log(`Clicking on card index of ${index}`)
    fireEvent.click(screen.getByTestId("Card "+index));
  })
  // Check to see that the cards that were clicked on now have their checkboxes checked false
  dormData.forEach((value, index, array) => {
    console.log(`Expecting card index of ${index} to have checked value of false`)
    expect(screen.getByTestId(`Card ${index}-checkbox`).checked).toEqual(false)
  })

})