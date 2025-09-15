import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Paper, Typography } from '@mui/material';
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
      center: [-5, 41.8], // Center on Castilla y León
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Box sx={{ px: { xs: 2, md: 0 }, py: 2 }}>
      <Box sx={{ width: '100%', height: '600px', position: 'relative' }}>
        <Paper
          elevation={0}
          sx={{
            height: '100%',
            overflow: 'hidden',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Map container */}
          <div
            ref={mapContainer}
            style={{
              width: '100%',
              height: '100%'
            }}
          />

          {/* Enhanced Legend */}
          <Paper
            elevation={0}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,

              backdropFilter: 'blur(10px)',
              padding: 3,
              borderRadius: 2,
              border: '1px solid rgba(0, 0, 0, 0.1)',
              minWidth: 180,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          >
            <Typography
              variant="subtitle1"
              textAlign="center"
              color="text.primary"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2
              }}
            >
              {selectedPollen}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    backgroundColor: '#ef4444',
                    borderRadius: '50%',
                    flexShrink: 0,
                    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {t('components.currentPollenLevels.map.legend.high')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    backgroundColor: '#eab308',
                    borderRadius: '50%',
                    flexShrink: 0,
                    boxShadow: '0 2px 4px rgba(234, 179, 8, 0.3)'
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {t('components.currentPollenLevels.map.legend.moderate')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    backgroundColor: '#22c55e',
                    borderRadius: '50%',
                    flexShrink: 0,
                    boxShadow: '0 2px 4px rgba(34, 197, 94, 0.3)'
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {t('components.currentPollenLevels.map.legend.low')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    backgroundColor: '#9ca3af',
                    borderRadius: '50%',
                    flexShrink: 0,
                    boxShadow: '0 2px 4px rgba(156, 163, 175, 0.3)'
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {t('components.currentPollenLevels.map.legend.nodata')}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Paper>
      </Box>
    </Box>
  );
}
