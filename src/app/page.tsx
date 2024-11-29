'use client'
import { DeviceControlProps, RoomProps } from './types';
import React, { useState } from 'react';
import { 
  Home, Tv, Sun, Moon, Shield, Thermometer,
  Power, Lock, Bell, Settings, Music, 
  PlaySquare, Heart, CircleDot, LampDesk
} from 'lucide-react';

const BRAND = {
  colors: {
    primary: 'bg-blue-600',
    secondary: 'bg-slate-800',
    accent: 'bg-amber-500'
  },
  website: 'www.connesso.co',
  tagline: 'Professional Smart Home Solutions'
};

const rooms = [
  { id: 'living', name: 'Living Room', icon: Home },
  { id: 'kitchen', name: 'Kitchen', icon: LampDesk },
  { id: 'master', name: 'Master Bedroom', icon: Heart },
  { id: 'theatre', name: 'Home Theatre', icon: PlaySquare },
  { id: 'patio', name: 'Outdoor Living', icon: Sun }
];

const scenes = [
  { id: 'morning', name: 'Good Morning', icon: Sun, color: 'bg-amber-500' },
  { id: 'movie', name: 'Movie Night', icon: PlaySquare, color: BRAND.colors.secondary },
  { id: 'party', name: 'Entertainment', icon: Music, color: BRAND.colors.primary },
  { id: 'dinner', name: 'Dinner Time', icon: LampDesk, color: 'bg-rose-600' },
  { id: 'away', name: 'Away Mode', icon: Lock, color: 'bg-slate-600' }
];

const getRoomDevices = (roomId) => ({
  lighting: [
    { id: `${roomId}-light-1`, name: 'Overhead', type: 'dimmer', value: 80 },
    { id: `${roomId}-light-2`, name: 'Accent', type: 'dimmer', value: 60 },
    { id: `${roomId}-light-3`, name: 'Art Lights', type: 'dimmer', value: 70 }
  ],
  climate: [
    { id: `${roomId}-hvac`, name: 'Temperature', type: 'thermostat', value: 72, mode: 'cool' }
  ],
  audio: [
    { id: `${roomId}-speakers`, name: 'Sonos Arc', type: 'speaker', source: 'Spotify', volume: 35 }
  ],
  video: roomId === 'theatre' ? [
    { id: 'theatre-display', name: 'Sony Projector', type: 'display', source: 'Apple TV' },
    { id: 'theatre-avr', name: 'Denon AVR', type: 'receiver', mode: 'movie' }
  ] : [
    { id: `${roomId}-tv`, name: 'Samsung TV', type: 'display', source: 'Cable TV' }
  ],
  shades: [
    { id: `${roomId}-shade-1`, name: 'Window Shades', type: 'shade', value: 100 }
  ]
});

const DeviceControl = ({ device, onChange }: DeviceControlProps) => {
  const getIcon = () => {
    switch(device.type) {
      case 'dimmer': return Sun;
      case 'thermostat': return Thermometer;
      case 'speaker': return Music;
      case 'display': return Tv;
      default: return Power;
    }
  };
  
  const Icon = getIcon();

  return (
    <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Icon className="text-blue-600" />
          <div>
            <h3 className="font-medium">{device.name}</h3>
            <p className="text-sm text-gray-500">{device.source || device.mode || `${device.value}%`}</p>
          </div>
        </div>
        <button className={`p-2 rounded-full ${BRAND.colors.primary} text-white hover:opacity-90`}>
          <Power className="w-4 h-4" />
        </button>
      </div>
      {(device.type === 'dimmer' || device.type === 'speaker') && (
        <input
          type="range"
          min="0"
          max="100"
          value={device.value || device.volume}
          onChange={(e) => onChange(device.id, parseInt(e.target.value))}
          className="w-full accent-blue-600"
        />
      )}
    </div>
  );
};

const Room = ({ room, devices }: RoomProps) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4 mb-8">
      <room.icon className="w-8 h-8 text-blue-600" />
      <h2 className="text-2xl font-semibold">{room.name}</h2>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {Object.values(devices).flat().map(device => (
        <DeviceControl 
          key={device.id}
          device={device}
          onChange={(id, value) => console.log(id, value)}
        />
      ))}
    </div>
  </div>
);

const SceneButton = ({ scene, onClick }) => (
  <button 
    onClick={onClick}
    className={`${scene.color} text-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-3 hover:opacity-90 transition-all hover:scale-105 w-full`}
  >
    <scene.icon className="w-8 h-8" />
    <span className="font-medium">{scene.name}</span>
  </button>
);

const App = () => {
  const [activeRoom, setActiveRoom] = useState(rooms[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/api/placeholder/40/40" alt="Connesso" className="rounded-lg" />
              <div>
                <h1 className="font-bold text-xl">Connesso</h1>
                <a href="https://www.connesso.co" 
                   className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                   target="_blank" 
                   rel="noopener noreferrer">
                  {BRAND.website}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-blue-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="w-5 h-5 text-blue-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Shield className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-5 gap-4">
            {scenes.map(scene => (
              <SceneButton 
                key={scene.id} 
                scene={scene}
                onClick={() => console.log('Activate scene:', scene.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          <div className="w-48 shrink-0">
            <h2 className="text-xl font-semibold mb-6">Rooms</h2>
            <div className="space-y-2">
              {rooms.map(room => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeRoom.id === room.id 
                      ? BRAND.colors.primary + ' text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <room.icon className="w-5 h-5" />
                  <span>{room.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <Room room={activeRoom} devices={getRoomDevices(activeRoom.id)} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
