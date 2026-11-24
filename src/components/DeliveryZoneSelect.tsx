import React from 'react';
import { DELIVERY_STATES, DELIVERY_ZONES } from '../../shared/pricing';

interface DeliveryZoneSelectProps {
  id: string;
  value: string;
  onChange: (zoneId: string) => void;
  className?: string;
}

/** Delivery area picker, grouped by state, with each area's fee in the option text. */
export const DeliveryZoneSelect: React.FC<DeliveryZoneSelectProps> = ({ id, value, onChange, className }) => (
  <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={className}>
    {DELIVERY_STATES.map((state) => {
      const zones = DELIVERY_ZONES.filter((z) => z.state === state.value);
      if (zones.length === 0) return null;
      return (
        <optgroup key={state.value} label={state.label}>
          {zones.map((z) => (
            <option key={z.id} value={z.id}>
              {z.label} — ₦{z.fee.toLocaleString()}
            </option>
          ))}
        </optgroup>
      );
    })}
  </select>
);
