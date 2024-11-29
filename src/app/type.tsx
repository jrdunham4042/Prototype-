// src/app/types.ts
import { LucideIcon } from 'lucide-react';

export interface Device {
  id: string;
  name: string;
  type: string;
  value?: number;
  mode?: string;
  source?: string;
  volume?: number;
}

export interface Room {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface DeviceControlProps {
  device: Device;
  onChange: (id: string, value: number) => void;
}

export interface RoomProps {
  room: Room;
  devices: {
    [key: string]: Device[];
  };
}
