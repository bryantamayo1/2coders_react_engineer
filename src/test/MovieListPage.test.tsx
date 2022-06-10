import {describe, test}     from 'vitest';
import {render}             from '@testing-library/react';
import { MovieListPage } from '../pages/AppPage';

describe("MovieListPage test", () => {
    test("MovieListPage exists?", () => {
        const component = render(<MovieListPage/>);
        component.getByText("MovieListPage");
    })
})