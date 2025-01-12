import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const mockProjects = [
  {
    "percentage.funded": 123,
    "amt.pledged": 3000,
  },
  {
    "percentage.funded": 99,
    "amt.pledged": 1500,
  },
  {
    "percentage.funded": 250,
    "amt.pledged": 10000,
  },
  {
    "percentage.funded": 50,
    "amt.pledged": 500,
  },
  {
    "percentage.funded": 75,
    "amt.pledged": 750,
  },
  {
    "percentage.funded": 180,
    "amt.pledged": 9000,
  },
];

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockProjects),
    })
  );
});

afterAll(() => {
  global.fetch.mockRestore();
});

test("renders table with projects and handles pagination", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("3000")).toBeInTheDocument();
  });
  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(6);
  expect(screen.queryByText("180")).not.toBeInTheDocument();

  const nextButton = screen.getByRole("button", { name: /next/i });
  userEvent.click(nextButton);

  await waitFor(() => {
    expect(screen.getByText("180")).toBeInTheDocument();
  });

  const secondPageRows = screen.getAllByRole("row");
  expect(secondPageRows).toHaveLength(2);
  userEvent.click(nextButton);
  const secondPageRowsAgain = screen.getAllByRole("row");
  expect(secondPageRowsAgain).toHaveLength(2);

  const prevButton = screen.getByRole("button", { name: /previous/i });
  userEvent.click(prevButton);

  await waitFor(() => {
    expect(screen.getByText("123")).toBeInTheDocument();
  });
  expect(screen.queryByText("180")).not.toBeInTheDocument();
});

test("handles fetch error gracefully", async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.reject(new Error("Network error"))
  );

  render(<App />);

  await waitFor(() => {
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1);
  });
});
