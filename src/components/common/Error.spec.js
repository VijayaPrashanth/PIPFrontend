import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { ReactDOM } from "react-dom";

import Error from "./Error";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, screen } from "@testing-library/react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { createRoot } from "react-dom/client";

configure({ adapter: new Adapter() });

describe("Basic rendering", () => {
    it("Should render with icon and message",  () => {
        const testErrorMessage = "Not Found";

        const {getByTestId} = render(<Error errorIcon={ErrorOutlineIcon} errorMessage={testErrorMessage}/>)

        const erroricon = getByTestId("displayableError");
        expect(erroricon).toBeInTheDocument();
        expect(testErrorMessage).toBeDefined();       
    });
});


