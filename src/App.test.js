import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { mockFetch } from "./mockFetch";

describe("App Component", () => {
  it("renders without errors", () => {
    render(<App />);
  });
});

describe("App", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => mockFetch({ data: ["String 1", "String 2"] }));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  // User enters a valid search query and clicks submit, and the function returns the correct search results.
  it("should return correct search results when user enters a valid search query and clicks submit", async () => {
    const { getByTestId, getByText } = render(<App />);

    const input = getByTestId("input");
    const submitButton = getByTestId("submit");

    fireEvent.change(input, { target: { value: "STRING" } });
    fireEvent.click(submitButton);

    // Wait for the asynchronous update of findings
    const result1 = await waitFor(() => getByText("String 1"));
    const result2 = await waitFor(() => getByText("String 2"));

    expect(result1).toBeInTheDocument();
    expect(result2).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/searchMyData?search=STRING"
    );
  });
});

describe("Empty data", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => mockFetch({ data: [] }));
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return 'No results found' when user enters a valid empty query and clicks submit", async () => {
    const { getByTestId, getByText, queryByTestId } = render(<App />);

    const input = getByTestId("input");
    const submitButton = getByTestId("submit");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(submitButton);

    const result1 = await waitFor(() => getByText("No Search Result found"));
    const noResultElement = await waitFor(() => queryByTestId("result"));
    expect(noResultElement).toBeNull();
    expect(result1).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/searchMyData?search="
    );
  });
});

//---------------------------------------------------------------------------------------------
//Without axios

// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import App from "./App";

// describe("App Component", () => {
//   it("renders without errors", () => {
//     render(<App />);
//   });
// });

// describe("App", () => {
//   it("should display search results when user types in a search query with uppercase letters and clicks submit", () => {
//     const { getByTestId, getByText, queryByTestId } = render(<App />);
//     const input = getByTestId("input");
//     const submitButton = getByTestId("submit");

//     fireEvent.change(input, { target: { value: "STRING" } });
//     fireEvent.click(submitButton);

//     expect(getByText("String 1")).toBeInTheDocument();
//     expect(getByText("String 2")).toBeInTheDocument();
//     expect(getByText("String 3")).toBeInTheDocument();
//     expect(getByText("String 4")).toBeInTheDocument();
//     const noResultElement = queryByTestId("noResult");

//     expect(noResultElement).toBeNull();
//   });

//   it("should display the matching string when user inputs a matching string and clicks Submit", () => {
//     const { getByTestId, getByText } = render(<App />);
//     const input = getByTestId("input");
//     const submitButton = getByText("Submit");

//     fireEvent.change(input, { target: { value: "String 2" } });
//     fireEvent.click(submitButton);

//     expect(getByText("String 2")).toBeInTheDocument();
//   });

//   it('should display "No Search Result found" when user types in an empty search query and clicks submit', () => {
//     const { getByTestId, getByText } = render(<App />);
//     const input = getByTestId("input");
//     const submitButton = getByTestId("submit");

//     fireEvent.change(input, { target: { value: "" } });
//     fireEvent.click(submitButton);

//     expect(getByText("No Search Result found")).toBeInTheDocument();
//   });

//   it("should display search results when user types in a search query with lowercase letters and clicks submit", () => {
//     const { getByTestId, getByText } = render(<App />);
//     const input = getByTestId("input");
//     const submitButton = getByText("Submit");

//     fireEvent.change(input, { target: { value: "String" } });
//     fireEvent.click(submitButton);

//     const result = getByTestId("result");
//     expect(result.children.length).toBeGreaterThanOrEqual(4);
//   });

//   it("should display new search result when searchList is modified", () => {
//     const { getByTestId, getByText, queryByTestId } = render(<App />);
//     const input = getByTestId("input");
//     const submitButton = getByTestId("submit");

//     fireEvent.change(input, { target: { value: "Stri" } });
//     fireEvent.change(input, { target: { value: "String 4" } });
//     fireEvent.click(submitButton);

//     expect(getByText("String 4")).toBeInTheDocument();
//     const noResultElement = queryByTestId("noResult");
//     expect(noResultElement).toBeNull();
//   });
// });
