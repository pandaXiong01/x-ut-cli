import React from "react";
import { render } from "@testing-library/react";
import App from "../../src/App";

it("renders a message", () => {
  const { container } = render(<App />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <h1>Hello, World!</h1>
  `);
});
