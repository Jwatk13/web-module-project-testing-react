import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

const testEpisode = {
    summary: "testing",
    image: null
}

test("renders without error", () => {
    render(<Episode episode={testEpisode}/>)
 });

test("renders the summary test passed as prop", () => {
    render(<Episode episode={testEpisode}/>)

    const summarySays = screen.queryByText(/testing/i);

    expect(summarySays).toBeInTheDocument();
    expect(summarySays).toBeTruthy();
    expect(summarySays).toHaveTextContent("testing");
 });

test("renders default image when image is not defined", () => {
    render(<Episode episode={testEpisode} />)

    const imgTest = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');

    expect(imgTest).toBeInTheDocument();
 });
