'use client'

import { useState, useEffect } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

interface ServerLocation {
  name: string
  coordinates: [number, number]
  status: 'online' | 'offline'
  latency: string
  users: number
}

const servers: ServerLocation[] = [
  {
    name: 'Dakar',
    coordinates: [-17.4677, 14.7167],
    status: 'online',
    latency: '12ms',
    users: 1250,
  },
  {
    name: 'Paris',
    coordinates: [2.3522, 48.8566],
    status: 'online',
    latency: '8ms',
    users: 4820,
  },
  {
    name: 'New York',
    coordinates: [-74.006, 40.7128],
    status: 'online',
    latency: '15ms',
    users: 7340,
  },
]

export function WorldMapSection() {
  const [activeServer, setActiveServer] = useState<ServerLocation | null>(null)

  return (
    <section id="servers" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Infrastructure</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mt-4 mb-6 text-balance">
            Global Server Network
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg text-pretty">
            Strategically positioned servers ensure lightning-fast responses 
            wherever you are in the world.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card/30 rounded-2xl border border-border/50 p-4 overflow-hidden">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 120,
                center: [0, 30],
              }}
              style={{ width: '100%', height: 'auto' }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="var(--secondary)"
                      stroke="var(--border)"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none', fill: 'var(--muted)' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>
              {servers.map((server) => (
                <Marker
                  key={server.name}
                  coordinates={server.coordinates}
                  onMouseEnter={() => setActiveServer(server)}
                  onMouseLeave={() => setActiveServer(null)}
                >
                  <g className="cursor-pointer">
                    <circle
                      r={12}
                      fill="var(--primary)"
                      fillOpacity={0.2}
                      className="animate-ping"
                    />
                    <circle
                      r={8}
                      fill="var(--primary)"
                      className="transition-transform hover:scale-125"
                    />
                    <circle r={4} fill="var(--background)" />
                  </g>
                </Marker>
              ))}
            </ComposableMap>
          </div>

          {/* Server Info Tooltip */}
          {activeServer && (
            <div className="absolute top-4 right-4 bg-card border border-primary/50 rounded-lg p-4 shadow-xl shadow-primary/10">
              <h4 className="font-semibold text-foreground mb-2">{activeServer.name} Server</h4>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  Status: <span className="text-green-500">Online</span>
                </p>
                <p className="text-muted-foreground">
                  Latency: <span className="text-primary">{activeServer.latency}</span>
                </p>
                <p className="text-muted-foreground">
                  Active Users: <span className="text-foreground">{activeServer.users.toLocaleString()}</span>
                </p>
              </div>
            </div>
          )}

          {/* Server List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {servers.map((server) => (
              <div
                key={server.name}
                className="bg-card/50 border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <h4 className="font-semibold text-foreground">{server.name}</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Latency</p>
                    <p className="text-primary font-medium">{server.latency}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Users</p>
                    <p className="text-foreground font-medium">{server.users.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
