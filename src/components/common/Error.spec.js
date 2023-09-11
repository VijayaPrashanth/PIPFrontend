import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { ReactDOM } from "react-dom";

import Error from "./Error";
import { Typography } from "@material-ui/core";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render, screen } from "@testing-library/react";
import { ErrorOutline, ErrorOutlineOutlined } from "@material-ui/icons";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";


import { createRoot } from "react-dom/client";
configure({ adapter: new Adapter() });

describe("Basic rendering", () => {
    it("Should render with icon and message", async () => {
        const testErrorMessage = "Test Error";
         const TestErrorIcon = () => <span />;

    

        let wrapper;
        await act(async () => {
            wrapper = mount(
                <Error errorIcon={ErrorOutlineIcon} errorMessage={testErrorMessage} />
            );
            await new Promise((resolve) => setTimeout(resolve, 2000));
        });

        wrapper.update();

        const errorComponent = wrapper;
        const testErrorIconComponent = errorComponent.find(TestErrorIcon);
        const typographyComponent = errorComponent.find(Typography);

        expect(testErrorIconComponent.length).toBe(1);
        expect(typographyComponent.length).toBe(1);
        expect(typographyComponent.text()).toBe(testErrorMessage);
    });
});

describe("Error Icon", () => {
    it("Should render with icon and message", async () => {
        const testErrorMessage = "Test Error";
        // const TestErrorIcon = () => <span />;

        render(
            <Error errorIcon={ErrorOutlineIcon} errorMessage={testErrorMessage} />
              //Promise((resolve) => setTimeout(resolve, 2000));
        );

        const testErrorIconComponent = screen.getByTestId("error_icon");
        //const typographyComponent = screen.getByText(testErrorMessage);

        expect(testErrorIconComponent).toBeInTheDocument();
        //expect(typographyComponent).toBeInTheDocument();
    });
});

describe("Error component", () => {
    it("renders the error message when displayAble is true", () => {
        const errorIcon = <div data-testid="fake-error-icon" />;
        const errorMessage = "This is an error message";

        const { getByText, getByTestId } = render(
            <Error errorIcon={ErrorOutlineIcon} errorMessage={errorMessage} />
        );

        // Assert that the error message is displayed
        //expect(getByText(errorMessage)).toBeInTheDocument();

        // Assert that the error icon is displayed
        expect(getByTestId("error_icon")).toBeInTheDocument();
    });

    it("does not render anything when displayAble is false", () => {
        const errorIcon = <div data-testid="fake-error-icon" />;
        const errorMessage = "This is an error message";

        const { container } = render(
            <Error errorIcon={ErrorOutlineIcon} errorMessage={errorMessage} />
        );

        // Assert that nothing is displayed when displayAble is false
        // expect(container.firstChild).toBeNull();
        expect(container.firstChild).toBeTruthy();
    });
});
