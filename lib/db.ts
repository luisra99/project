import { Reservation } from './types';

// Mock database for reservations
// In a real app, this would be replaced with a database connection
let reservations: Reservation[] = [];

export const getReservations = () => {
  return reservations;
};

export const getReservationById = (id: string) => {
  return reservations.find((reservation) => reservation.id === id);
};

export const getReservationsByDate = (date: string) => {
  return reservations.filter((reservation) => reservation.date === date);
};

export const getReservationsByStatus = (status: Reservation['status']) => {
  return reservations.filter((reservation) => reservation.status === status);
};

export const createReservation = (reservation: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
  const newReservation: Reservation = {
    id: Math.random().toString(36).substring(2, 9),
    ...reservation,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  reservations.push(newReservation);
  return newReservation;
};

export const updateReservation = (id: string, updates: Partial<Reservation>) => {
  const index = reservations.findIndex((reservation) => reservation.id === id);
  if (index !== -1) {
    reservations[index] = {
      ...reservations[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return reservations[index];
  }
  return null;
};

export const updateReservationStatus = (id: string, status: Reservation['status']) => {
  return updateReservation(id, { status });
};

export const deleteReservation = (id: string) => {
  const index = reservations.findIndex((reservation) => reservation.id === id);
  if (index !== -1) {
    const deleted = reservations[index];
    reservations = reservations.filter((reservation) => reservation.id !== id);
    return deleted;
  }
  return null;
};

export const isTimeSlotAvailable = (date: string, time: string) => {
  const existingReservations = reservations.filter(
    (r) => r.date === date && r.time === time && (r.status === 'confirmed' || r.status === 'pending')
  );
  // Assuming a limited number of reservations per time slot
  // In a real app, this would be more sophisticated based on tables/capacity
  return existingReservations.length < 3;
};

// Load some sample data for development purposes
export const loadSampleData = () => {
  if (reservations.length === 0) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    
    reservations = [
      {
        id: '1',
        guestName: 'John Smith',
        guestEmail: 'john@example.com',
        guestPhone: '555-123-4567',
        partySize: 4,
        date: formatDate(today),
        time: '19:00',
        specialRequests: 'Window seat if possible',
        status: 'confirmed',
        createdAt: new Date(today.getTime() - 86400000).toISOString(),
        updatedAt: new Date(today.getTime() - 43200000).toISOString()
      },
      {
        id: '2',
        guestName: 'Maria Garcia',
        guestEmail: 'maria@example.com',
        guestPhone: '555-987-6543',
        partySize: 2,
        date: formatDate(tomorrow),
        time: '20:00',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        guestName: 'Ahmed Hassan',
        guestEmail: 'ahmed@example.com',
        guestPhone: '555-456-7890',
        partySize: 6,
        date: formatDate(tomorrow),
        time: '18:30',
        specialRequests: 'Celebrating a birthday',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
  return reservations;
};

// Initialize sample data
loadSampleData();