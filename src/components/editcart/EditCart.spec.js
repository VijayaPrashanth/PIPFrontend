import React from "react";
import { render, screen } from "@testing-library/react";
import EditCart from "./EditCart";

describe("dialog box for editing the cart item should be present",()=>{
    it("should display a dialog box",async()=>{
        render(<EditCart open={true}/>);
        await expect(screen.getByTestId('dialogbox')).toBeTruthy();
    });

    it("should have a grid for quantity", async () => {
        render(<EditCart open={true} />);
        await expect(screen.getByTestId('quantity')).toBeTruthy();
    });

    it("should have a grid for unit", async () => {
        render(<EditCart open={true} />);
        await expect(screen.getByTestId('unit')).toBeTruthy();
    });

    it("should have a close button", async () => {
        render(<EditCart open={true} />);
        await expect(screen.getByTestId('closeButton')).toBeTruthy();
    });

    it("should have a done button", async () => {
        render(<EditCart open={true} />);
        await expect(screen.getByTestId('done button')).toBeTruthy();
    });


});