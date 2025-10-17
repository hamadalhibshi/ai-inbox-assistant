import type { Ticket } from "../../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const extractFields = async (messageText: string) => {
  const response = await fetch(`${BASE_URL}/ai`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messageText }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const saveAiTicket = async (data: Ticket) => {
  const response = await fetch(`${BASE_URL}/ai/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const getTickets = async () => {
  const response = await fetch(`${BASE_URL}/ai`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const deleteTicket = async (id: string | undefined) => {
  const response = await fetch(`${BASE_URL}/ai/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const editTicket = async (data: Ticket) => {
  const response = await fetch(`${BASE_URL}/ai/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
