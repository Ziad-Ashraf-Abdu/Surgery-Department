import React, { useState } from "react";
import {
  FaHeartbeat,
  FaSmile,
  FaBell,
  FaLightbulb,
  FaBookMedical,
  FaBullseye,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from "recharts";

export default function ProfileInfo() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mood, setMood] = useState(5);
  const [notes, setNotes] = useState("");

  const carouselSlides = [
    {
      title: "Health Insights",
      icon: <FaHeartbeat />,
      content: (
        <div className="vitals-grid">
          <div className="vital-item bp good">
            <span>120/80</span>
            <small>BP</small>
          </div>
          <div className="vital-item hr warning">
            <span>88</span>
            <small>BPM</small>
          </div>
          <div className="vital-item temp good">
            <span>98.6°F</span>
            <small>Temp</small>
          </div>
          <div className="vital-item glucose critical">
            <span>150</span>
            <small>Glucose</small>
          </div>
        </div>
      )
    },
    {
      title: "Mental Wellness",
      icon: <FaSmile />,
      content: (
        <div className="mood-tracker">
          <h4>How are you feeling today?</h4>
          <div className="mood-scale">
            <input
              type="range"
              min="1"
              max="10"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
            <div className="mood-labels">
              <span>😞</span>
              <span>😐</span>
              <span>😊</span>
            </div>
          </div>
          <div className="mood-buttons">
            {['Tired', 'Stressed', 'Happy'].map(m => (
              <button key={m} className="mood-pill">{m}</button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Reminders",
      icon: <FaBell />,
      content: (
        <div className="reminders-list">
          <div className="reminder-item">
            <FaHeartbeat /> Refill Medication in 3 days
          </div>
          <div className="reminder-item">
            <FaBookMedical /> Follow-up Appointment (May 5)
          </div>
        </div>
      )
    },
    {
      title: "Health Tips",
      icon: <FaLightbulb />,
      content: (
        <div className="health-tips">
          <div className="tip-card">🚰 Stay Hydrated</div>
          <div className="tip-card">💤 Get 8 Hours Sleep</div>
          <div className="tip-card">🧘 Daily Stretching</div>
        </div>
      )
    },
    {
      title: "Patient Notes",
      icon: <FaBookMedical />,
      content: (
        <textarea
          className="notes-input"
          placeholder="Record symptoms or questions..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      )
    },
    {
      title: "Health Goals",
      icon: <FaBullseye />,
      content: (
        <div className="goals-tracker">
          <div className="goal-item">
            <span>🏃♀️ 10k Steps/Day</span>
            <div className="goal-progress">
              {[0, 0, 0].map((_, i) => (
                <div key={i} className={`goal-check ${i < 2 ? 'checked' : ''}`} />
              ))}
            </div>
          </div>
          <div className="goal-item">
            <span>💊 Medication Adherence</span>
            <div className="goal-stats">95%</div>
          </div>
        </div>
      )
    },
    {
      title: "Health Data Analytics",
      icon: <FaHeartbeat />,
      content: (
        <div className="analytics-container">
          <h4>Vitals Trends</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={[
                { name: "Mon", bp: 120, bpm: 85, temp: 98.6 },
                { name: "Tue", bp: 122, bpm: 87, temp: 98.7 },
                { name: "Wed", bp: 121, bpm: 88, temp: 98.8 },
                { name: "Thu", bp: 118, bpm: 86, temp: 98.5 }
              ]}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bp" stroke="#8884d8" />
              <Line type="monotone" dataKey="bpm" stroke="#82ca9d" />
              <Line type="monotone" dataKey="temp" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>

          <h4>Mood Progress</h4>
          <RadialBarChart
            width={200}
            height={200}
            innerRadius="10%"
            outerRadius="80%"
            data={[{ name: "Mood", value: mood, fill: "#3A59D1" }]}
          >
            <RadialBar minAngle={15} background clockWise={true} />
          </RadialBarChart>

          <h4>Activity Progress</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={[
                { name: "Mon", steps: 8000 },
                { name: "Tue", steps: 10000 },
                { name: "Wed", steps: 9500 },
                { name: "Thu", steps: 11000 }
              ]}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="steps" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )
    }
  ];

  const handleCarouselNav = (direction) => {
    setCurrentSlide(prev => {
      if (direction === 'next') return (prev + 1) % carouselSlides.length;
      return (prev - 1 + carouselSlides.length) % carouselSlides.length;
    });
  };

  return (
    <div className="doctor-card">
      <div className="health-carousel">
        <div className="carousel-header">
          <h3>{carouselSlides[currentSlide].icon} {carouselSlides[currentSlide].title}</h3>
          <div className="carousel-nav">
            <button onClick={() => handleCarouselNav('prev')}>
              <FaChevronLeft />
            </button>
            <span>{currentSlide + 1}/{carouselSlides.length}</span>
            <button onClick={() => handleCarouselNav('next')}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="carousel-content">
          {carouselSlides[currentSlide].content}
        </div>
      </div>
    </div>
  );
}
