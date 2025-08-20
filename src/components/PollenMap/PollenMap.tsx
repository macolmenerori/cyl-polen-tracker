import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Chip, Paper, Typography } from '@mui/material';
import mapboxgl from 'mapbox-gl';

// Import Mapbox CSS
import 'mapbox-gl/dist/mapbox-gl.css';

import { LevelType, PollenApiResult } from '@/types/pollen';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

interface PollenMapProps {
  pollenApiData: PollenApiResult[];
  selectedPollen: string;
}

type PollenDataType = {
  province: string;
  level: LevelType;
};

export function PollenMap({ pollenApiData, selectedPollen }: PollenMapProps) {
  const pollenData: PollenDataType[] = pollenApiData.map((data) => ({
    province: data.estaciones,
    level: data.prevision_proximos_dias
  }));

  const { t } = useTranslation();

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Color mapping for pollen levels
  const getColorForLevel = (level: LevelType | undefined): string => {
    switch (level) {
      case 'ALTO':
        return '#ef4444'; // Red
      case 'MODERADO':
        return '#eab308'; // Yellow
      case 'BAJO':
        return '#22c55e'; // Green
      default:
        return '#9ca3af'; // Gray
    }
  };

  // Create a map of province names to pollen levels
  const pollenLevelMap = useMemo(() => {
    const map = new Map<string, LevelType>();
    pollenData.forEach((item) => {
      // Normalize province names for matching (remove accents, convert to uppercase, trim)
      const normalizedProvince = item.province.trim().toUpperCase();
      map.set(normalizedProvince, item.level);
    });
    return map;
  }, [pollenData]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-5.5, 41.8], // Center on Castilla y León
      zoom: 6,
      projection: 'mercator'
    });

    map.current.on('load', () => {
      setMapLoaded(true);

      if (!map.current) return;

      // Add Spanish provinces GeoJSON source
      map.current.addSource('spain-provinces', {
        type: 'geojson',
        data: '/data/CyL_Boundaries.geojson'
      });

      // Add province fill layer
      map.current.addLayer({
        id: 'provinces-fill',
        type: 'fill',
        source: 'spain-provinces',
        filter: [
          'in',
          ['upcase', ['get', 'name']],
          [
            'literal',
            [
              'ÁVILA',
              'BURGOS',
              'LEÓN',
              'PALENCIA',
              'SALAMANCA',
              'SEGOVIA',
              'SORIA',
              'VALLADOLID',
              'ZAMORA'
            ]
          ]
        ],
        paint: {
          'fill-color': [
            'case',
            [
              'has',
              ['upcase', ['get', 'name']],
              [
                'literal',
                Object.fromEntries(
                  Array.from(pollenLevelMap.entries()).map(([province, level]) => [
                    province,
                    getColorForLevel(level)
                  ])
                )
              ]
            ],
            [
              'get',
              ['upcase', ['get', 'name']],
              [
                'literal',
                Object.fromEntries(
                  Array.from(pollenLevelMap.entries()).map(([province, level]) => [
                    province,
                    getColorForLevel(level)
                  ])
                )
              ]
            ],
            getColorForLevel(undefined) // Default gray color
          ],
          'fill-opacity': 0.7
        }
      });

      // Add province border layer
      map.current.addLayer({
        id: 'provinces-border',
        type: 'line',
        source: 'spain-provinces',
        filter: [
          'in',
          ['upcase', ['get', 'name']],
          [
            'literal',
            [
              'ÁVILA',
              'BURGOS',
              'LEÓN',
              'PALENCIA',
              'SALAMANCA',
              'SEGOVIA',
              'SORIA',
              'VALLADOLID',
              'ZAMORA'
            ]
          ]
        ],
        paint: {
          'line-color': '#ffffff',
          'line-width': 1
        }
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update map colors when pollen data changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Update the fill color expression
    const colorExpression: mapboxgl.ExpressionSpecification = [
      'case',
      [
        'has',
        ['upcase', ['get', 'name']],
        [
          'literal',
          Object.fromEntries(
            Array.from(pollenLevelMap.entries()).map(([province, level]) => [
              province,
              getColorForLevel(level)
            ])
          )
        ]
      ],
      [
        'get',
        ['upcase', ['get', 'name']],
        [
          'literal',
          Object.fromEntries(
            Array.from(pollenLevelMap.entries()).map(([province, level]) => [
              province,
              getColorForLevel(level)
            ])
          )
        ]
      ],
      getColorForLevel(undefined) // Default gray color
    ];

    map.current.setPaintProperty('provinces-fill', 'fill-color', colorExpression);
  }, [pollenData, pollenLevelMap, mapLoaded]);

  return (
    <Box sx={{ width: '100%', height: '600px', position: 'relative', marginTop: 3 }}>
      <Paper elevation={3} sx={{ height: '100%', overflow: 'hidden' }}>
        {/* Map container */}
        <div
          ref={mapContainer}
          style={{
            width: '100%',
            height: '100%'
          }}
        />

        {/* Legend */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: 2,
            borderRadius: 1,
            boxShadow: 2,
            minWidth: 150
          }}
        >
          <Typography variant="body1" textAlign="center" color="black" gutterBottom>
            {`${t('components.currentPollenLevels.map.legend.levels')}: ${selectedPollen}`}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Chip
              label={t('components.currentPollenLevels.map.legend.high')}
              size="small"
              sx={{ backgroundColor: '#ef4444', color: 'white', fontSize: '0.75rem' }}
            />
            <Chip
              label={t('components.currentPollenLevels.map.legend.moderate')}
              size="small"
              sx={{ backgroundColor: '#eab308', color: 'white', fontSize: '0.75rem' }}
            />
            <Chip
              label={t('components.currentPollenLevels.map.legend.low')}
              size="small"
              sx={{ backgroundColor: '#22c55e', color: 'white', fontSize: '0.75rem' }}
            />
            <Chip
              label={t('components.currentPollenLevels.map.legend.nodata')}
              size="small"
              sx={{ backgroundColor: '#9ca3af', color: 'white', fontSize: '0.75rem' }}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
