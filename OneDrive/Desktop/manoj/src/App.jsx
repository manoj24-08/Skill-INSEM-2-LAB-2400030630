import { useState } from 'react'
import './App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  // Predefined events array
  const events = [
    { date: '2023-10-01', title: 'Meeting', description: 'Team meeting at 10 AM' },
    { date: '2023-10-05', title: 'Birthday', description: 'John\'s birthday party' },
    { date: '2023-10-10', title: 'Conference', description: 'Tech conference' },
    { date: '2023-10-15', title: 'Doctor Appointment', description: 'Check-up at 2 PM' },
    { date: '2023-10-20', title: 'Workshop', description: 'React workshop' },
    { date: '2025-10-16', title: 'New Event', description: 'A new event added to the calendar' },
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleDateClick = (day) => {
    console.log('handleDateClick called with day:', day);
    console.log('currentYear:', currentYear, 'currentMonth:', currentMonth);
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    console.log('Date string construction:', dateString);
    console.log('Clicked date:', dateString);
    setSelectedDate(dateString);
  };

  const selectedEvents = events.filter(event => event.date === selectedDate);
  console.log('DEBUG: Selected date:', selectedDate);
  console.log('DEBUG: All events:', events);
  console.log('DEBUG: Filtered events:', selectedEvents);

  const renderCalendar = () => {
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvent = events.some(event => event.date === dateString);
      const isSelected = selectedDate === dateString;
      days.push(
        <div
          key={day}
          className={`calendar-day ${hasEvent ? 'has-event' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => {
            console.log('onClick triggered for day:', day);
            handleDateClick(day);
          }}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="app">
      <h1>Interactive Calendar</h1>
      <div className="calendar">
        <div className="calendar-header">
          <h2>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        </div>
        <div className="calendar-grid">
          <div className="calendar-day header">Sun</div>
          <div className="calendar-day header">Mon</div>
          <div className="calendar-day header">Tue</div>
          <div className="calendar-day header">Wed</div>
          <div className="calendar-day header">Thu</div>
          <div className="calendar-day header">Fri</div>
          <div className="calendar-day header">Sat</div>
          {renderCalendar()}
        </div>
      </div>
      {selectedDate && (
        <div className="events">
          <h3>Events for {new Date(selectedDate).toLocaleDateString()}</h3>
          {selectedEvents.length > 0 ? (
            selectedEvents.map((event, index) => (
              <div key={index} className="event">
                <h4>{event.title}</h4>
                <p>{event.description}</p>
              </div>
            ))
          ) : (
            <p>No events for this date.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App
