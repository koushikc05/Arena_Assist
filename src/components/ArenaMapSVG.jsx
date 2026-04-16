import React, { useMemo } from 'react';
import { MapPin, User, Store } from 'lucide-react';

const STALL_COORDS = {
  stall_1: { x: 400, y: 120 },   // North Concourse
  stall_2: { x: 680, y: 300 },   // East Concourse
  stall_3: { x: 400, y: 480 },   // South Concourse
};

const ALL_SEATS = [];
// North section (Above court)
for (let r = 0; r < 5; r++) {
  for (let c = 0; c < 15; c++) {
    ALL_SEATS.push({ id: `N${r + 1}-${c + 1}`, x: 260 + c * 20, y: 80 + r * 20 });
  }
}
// South section (Below court)
for (let r = 0; r < 5; r++) {
  for (let c = 0; c < 15; c++) {
    ALL_SEATS.push({ id: `S${r + 1}-${c + 1}`, x: 260 + c * 20, y: 440 + r * 20 });
  }
}
// West section
for (let r = 0; r < 10; r++) {
  for (let c = 0; c < 4; c++) {
    ALL_SEATS.push({ id: `W${r + 1}-${c + 1}`, x: 130 + c * 20, y: 220 + r * 20 });
  }
}
// East section
for (let r = 0; r < 10; r++) {
  for (let c = 0; c < 4; c++) {
    ALL_SEATS.push({ id: `E${r + 1}-${c + 1}`, x: 610 + c * 20, y: 220 + r * 20 });
  }
}

// Simple pseudo-random hash to map arbitrary seat numbers to a literal seat
const getSeatCoords = (seatString) => {
  if (!seatString) return null;
  let hash = 0;
  for (let i = 0; i < seatString.length; i++) {
    hash = seatString.charCodeAt(i) + ((hash << 5) - hash);
  }
  return ALL_SEATS[Math.abs(hash) % ALL_SEATS.length];
};

const ArenaMapSVG = ({ activeStallId, userSeat }) => {
  const seatCoords = useMemo(() => getSeatCoords(userSeat), [userSeat]);

  return (
    <svg viewBox="0 0 800 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Background/Base Floor */}
      <rect width="800" height="600" fill="#f8fafc" rx="24" />
      
      {/* The Arena Center / Court / Pitch */}
      <rect x="250" y="200" width="300" height="200" rx="40" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="4" />
      <circle cx="400" cy="300" r="40" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="3" />
      <line x1="400" y1="200" x2="400" y2="400" stroke="#cbd5e1" strokeWidth="3" />
      <text x="400" y="305" textAnchor="middle" fill="#94a3b8" fontSize="20" fontWeight="bold" opacity="0.5">STAGE / COURT</text>
      
      {/* Seating Sections Outer Ring */}
      <path d="M 150 100 Q 400 0 650 100 L 700 150 Q 800 300 700 450 L 650 500 Q 400 600 150 500 L 100 450 Q 0 300 100 150 Z" 
            fill="none" stroke="#e2e8f0" strokeWidth="60" opacity="0.3"/>
            
      <path d="M 180 130 Q 400 50 620 130 L 660 170 Q 750 300 660 430 L 620 470 Q 400 550 180 470 L 140 430 Q 50 300 140 170 Z" 
            fill="none" stroke="#cbd5e1" strokeWidth="80" opacity="0.5"/>

      {/* Exits & Restrooms - Subtle Markers */}
      <text x="400" y="40" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold" tracking="widest">NORTH ENTRANCE</text>
      <text x="400" y="570" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold" tracking="widest">SOUTH ENTRANCE</text>
      
      {/* Stall Markers */}
      {Object.entries(STALL_COORDS).map(([id, coords]) => {
        const isActive = activeStallId && activeStallId === id;
        const isMuted = activeStallId && activeStallId !== id;
        return (
          <g key={id} transform={`translate(${coords.x - 24}, ${coords.y - 24})`} 
             style={{ 
               transition: 'all 0.3s ease',
               opacity: isMuted ? 0.4 : 1,
               transform: `translate(${coords.x - 24}px, ${coords.y - 24}px) scale(${isActive ? 1.2 : 1})`,
               transformOrigin: '24px 24px'
             }}>
            <circle cx="24" cy="24" r="20" fill={isActive ? '#f59e0b' : '#ffffff'} stroke={isActive ? '#d97706' : '#e2e8f0'} strokeWidth="2" filter="drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))"/>
            <svg x="12" y="12" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#ffffff' : '#64748b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <text x="24" y="55" fontSize="14" fontWeight="bold" fill={isActive ? '#d97706' : '#64748b'} textAnchor="middle" style={{ filter: 'drop-shadow(0px 1px 2px rgba(255,255,255,0.8))' }}>
              Stall {id.split('_')[1]}
            </text>
          </g>
        );
      })}

      {/* Background Seats Grid */}
      <g>
        {ALL_SEATS.map((seat) => {
          // If this is exactly the user's seat, we skip it here and draw it highlighted later
          if (seatCoords && seatCoords.id === seat.id) return null;
          
          return (
            <g key={seat.id} transform={`translate(${seat.x - 8}, ${seat.y - 8})`}>
              <rect x="0" y="0" width="16" height="12" rx="3" fill="#cbd5e1" />
              <rect x="2" y="6" width="12" height="8" rx="2" fill="#f1f5f9" />
            </g>
          );
        })}
      </g>

      {/* User Seat Pin */}
      {seatCoords && (
        <g transform={`translate(${seatCoords.x - 20}, ${seatCoords.y - 20})`} style={{ animation: 'bounce 2s infinite' }}>
           {/* Seat Icon / Image */}
           <g transform="translate(0, -6)">
             {/* Backrest */}
             <rect x="6" y="0" width="28" height="16" rx="4" fill="#4f46e5" filter="drop-shadow(0 4px 6px rgb(79 70 229 / 0.4))"/>
             {/* Cushion */}
             <rect x="8" y="16" width="24" height="12" rx="3" fill="#6366f1" />
             {/* Armrests */}
             <rect x="2" y="12" width="6" height="18" rx="3" fill="#312e81" />
             <rect x="32" y="12" width="6" height="18" rx="3" fill="#312e81" />
           </g>
           
           <text x="20" y="-16" fontSize="16" fontWeight="900" fill="#312e81" textAnchor="middle" style={{ textShadow: '0 2px 4px rgba(255,255,255,0.9)' }}>
             Seat {userSeat}
           </text>
           <text x="20" y="4" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">
             YOU
           </text>
        </g>
      )}
    </svg>
  );
};

export default ArenaMapSVG;
