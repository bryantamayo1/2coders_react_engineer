import {describe, test}     from 'vitest';
import {render}             from '@testing-library/react';
import { Header }           from '../components/Header';
import { Footer }           from '../components/Footer';

describe("MyMovies tests", () => {
    test("Footer exists?", () => {
        const component = render(<Footer/>);
        component.getByText("© MyMovies 2022. All rights reserved.");
    });
})