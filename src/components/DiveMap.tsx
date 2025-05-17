import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const DiveMap = ({ diveSites, selectedSiteId, onSelectSite }) => {
  return (
    <div className='h-[500px] w-full rounded shadow overflow-hidden'>
      <MapContainer
        center={[16.3, -86.55]}
        zoom={12}
        scrollWheelZoom
        className='h-full w-full'
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {diveSites.map((site) => (
          <DiveMarker
            key={site.id}
            site={site}
            isSelected={site.id === selectedSiteId}
            onClick={() => onSelectSite(site.id)}
          />
        ))}
      </MapContainer>
    </div>
  );
};

const DiveMarker = ({ site, isSelected, onClick }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (isSelected && markerRef.current) {
      map.setView([site.lat, site.lng], 14, { animate: true });
      markerRef.current.openPopup();
    }
  }, [isSelected, map, site.lat, site.lng]);

  return (
    <Marker
      ref={markerRef}
      position={[site.lat, site.lng]}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <strong>{site.name}</strong>
        <br />
        Depth: {site.depth} ft
        <br />
        Difficulty: {site.difficulty}
      </Popup>
    </Marker>
  );
};

export default DiveMap;
