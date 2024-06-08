type UUID = string;

type Event = {
  eventId: UUID;
  namePub: string;
  description: string;
  currencyIso: string;
  dateFrom: string;
  dateTo: string;
  headerImageUrl: string;
  place: string;
};

type Ticket = {
  id: UUID;
  name: string;
  price: number;
};

type Seat = {
  seatId: UUID;
  place: number;
  ticketTypeId: UUID;
};

type SeatRow = {
  seatRow: number;
  seats: Seat[];
};

type EventTicketsResponse = {
  ticketTypes: Ticket[];
  seatRows: SeatRow[];
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
};

type LoginResponse = {
  message: string;
  user: User;
};

type OrderRequest = {
  eventId: UUID;
  tickets: {
    ticketTypeId: UUID;
    seatId: UUID;
  }[];
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
};

type OrderResponse = {
  message: string;
  orderId: UUID;
  tickets: {
    ticketTypeId: UUID;
    seatId: UUID;
    price: number;
    place: number;
  }[];
  user: User;
  totalAmount: number;
};

export type {
  UUID,
  Event,
  Ticket,
  Seat,
  SeatRow,
  EventTicketsResponse,
  User,
  LoginResponse,
  OrderRequest,
  OrderResponse,
};
