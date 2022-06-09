import {describe, test}     from 'vitest';
import {render}             from '@testing-library/react';
import { MovieListPage } from '../pages/MovieListPage';

describe("MovieListPage test", () => {
    test("MovieListPage exists?", () => {
        const component = render(<MovieListPage/>);
        component.getByText("MovieListPage");
    })
})