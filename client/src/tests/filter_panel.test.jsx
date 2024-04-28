/*
* Use `npm run test` to run test scripts ending in .test.js
* */

// Import the render function from @testing-library/react
import { test, expect } from 'vitest';
import {render, fireEvent, screen, cleanup} from '@testing-library/react';
import { JSDOM } from 'jsdom';

import React from 'react';
import MinimizeFilter from '../components/housing_selection/MinimizeFilter.jsx';
import CheckboxFilter from "../components/housing_selection/CheckboxFilter.jsx";
import SliderFilter from "../components/housing_selection/SliderFilter.jsx";

describe('MinimizeFilter component', () => {
  it('renders correctly with initial state', () => {
      const { getByText, getByTestId } = render(<MinimizeFilter name="Test Filter" Idname="testId" minimizeId="minimize" />);
      const titleElement = getByText('Test Filter');
      const minimizeButton = getByTestId('Test FilterMinimizeButton');
      expect(titleElement.textContent).toBe("Test Filter");
  });

  it('minimizes SliderFilter visibility on click correctly', () => {
      beforeEach(cleanup)

      render(<div>
          <SliderFilter name="Semester Rate" Idname="semesterRate" min="0" max="100000"/>
      </div>)

      // This should minimize the element
      fireEvent.click(screen.getByTestId("Semester RateMinimizeButton"))
      expect(screen.getByTestId("Semester Rate SliderDiv").style.display).toEqual("none")

      // This should expand the element
      fireEvent.click(screen.getByTestId("Semester RateMinimizeButton"))
      expect(screen.getByTestId("Semester Rate SliderDiv").style.display).toEqual("block")

      // Minimize that element again
      fireEvent.click(screen.getByTestId("Semester RateMinimizeButton"))
      expect(screen.getByTestId("Semester Rate SliderDiv").style.display).toEqual("none")

  });

  it('minimizes CheckboxFilter visibility on click correctly', () => {
      beforeEach(cleanup)

      const filtersList = ["All", "Pharmacy-Only", "Freshman-Only", "International-Only", "Honors-Only", "2nd Year+"]

      const checkBoxName = "Amenities"

      // The id for Checkbox list items is:
      // <div data-testid={props.name+index}>
      render(<div>
          <CheckboxFilter name={checkBoxName} Idname="amenities" list={filtersList}/>
      </div>)

      // This should minimize the element
      fireEvent.click(screen.getByTestId(checkBoxName+"MinimizeButton"))

      // Check to see that all of the elements that are currently expanded are now invisible again
      for (let i = 0; i < filtersList.length; i++) {
        expect(screen.getByTestId(checkBoxName+i).style.display).toEqual("none")
      }

      // This should expand the elements once again
      fireEvent.click(screen.getByTestId(checkBoxName+"MinimizeButton"))

      // Check to see that all of the elements that were previously minimized are now visible again
      for (let i = 0; i < filtersList.length; i++) {
        expect(screen.getByTestId(checkBoxName+i).style.display).toEqual("block")
      }
  });
});
