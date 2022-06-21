import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const testShow = {
    name: "test show",
    summary: "test summary",
    seasons: [
        {
            id: 0,
            name: "Season 1",
            episodes: []
        },
        {
            id: 1,
            name: "Season 2",
            episodes: []
        }
    ]
}

test('renders without errors with no props', async () => {
    render(<Display />)
 });

test('renders Show component when the button is clicked ', async () => {
    render(<Display />)
    mockFetchShow.mockResolvedValueOnce(testShow);

    const showButton = screen.queryByRole('button');
    fireEvent.click(showButton)

    await waitFor(() => {
        let showComp = screen.queryByTestId('show-container')
    expect(showComp).toBeInTheDocument();   
    })
    

 });

test('renders show season options matching your data when the button is clicked', async () => {
    render(<Display />)
    mockFetchShow.mockResolvedValueOnce(testShow);

    const showButton = screen.queryByRole('button');
    fireEvent.click(showButton)

    await waitFor(() => {
        let testSeasonOptions = screen.getAllByTestId('season-option')
        expect(testSeasonOptions).toHaveLength(2);
    })
 });

 //need to mock the call
 test('calls displayFunc when button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    const displayingFunc = jest.fn();


    render(<Display displayFunc={displayingFunc}/>)

    const showButton = screen.queryByRole('button');
    fireEvent.click(showButton)

    await waitFor(() => {
        expect(displayingFunc).toHaveBeenCalled();
    })
 });

 /**THE DISPLAY COMPONENT
This component holds the state values of the application and handles api calls. In this component's tests, you work with mocking external modules and working with async / await / waitFor

 Test that the Display component renders without any passed in props.
 Rebuild or copy the show test data element as used in the previous set of tests.
 Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
 Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
 Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called. */
