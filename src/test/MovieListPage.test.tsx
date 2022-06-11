import {describe, test}     from 'vitest';
import {render}             from '@testing-library/react';
import { ListMovies } from '../pages/ListMovies';

describe("ListMovies test", () => {
    test("ListMovies exists?", () => {
        const component = render(<ListMovies/>);
        component.getByText("ListMovies");
    })
})