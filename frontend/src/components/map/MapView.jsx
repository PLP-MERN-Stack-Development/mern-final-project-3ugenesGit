import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

export const MapView = ({ reports = [], hotspots = [] }) => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  if (!mapboxgl.accessToken) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-100 text-center text-sm text-slate-500">
        Provide a Mapbox token in <code className="font-mono">VITE_MAPBOX_TOKEN</code>.
      </div>
    );
  }

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [0, 0],
      zoom: 1.5,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const markers = [];

    reports.forEach((report) => {
      if (!report.location?.coordinates) return;
      const marker = new mapboxgl.Marker({ color: '#22c55e' })
        .setLngLat(report.location.coordinates)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<strong>${report.category}</strong><p>Status: ${report.status}</p>`
          )
        )
        .addTo(mapRef.current);
      markers.push(marker);
    });

    hotspots.forEach((hotspot) => {
      const marker = new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat(hotspot.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>Hotspot</strong><p>${hotspot.label}</p>`))
        .addTo(mapRef.current);
      markers.push(marker);
    });

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [reports, hotspots]);

  return <div ref={containerRef} className="h-full w-full rounded-2xl shadow-glass" />;
};

