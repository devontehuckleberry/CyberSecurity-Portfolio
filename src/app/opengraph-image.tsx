import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const alt = 'Devonte Huckleberry — Cybersecurity Portfolio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const playfair = readFileSync(join(process.cwd(), 'public/fonts/playfair-bold.ttf'))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          position: 'relative',
        }}
      >
        {/* Faint red glow behind the monogram */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(193,18,31,0.22) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
            display: 'flex',
          }}
        />

        {/* DH monogram */}
        <div
          style={{
            fontSize: 220,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: 'Playfair Display',
            letterSpacing: '-8px',
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          DH
        </div>

        {/* Thin red rule */}
        <div
          style={{
            width: 64,
            height: 2,
            background: '#C1121F',
            marginBottom: 28,
            display: 'flex',
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.75)',
            fontFamily: 'Playfair Display',
            letterSpacing: '6px',
            textTransform: 'uppercase',
          }}
        >
          Devonte Huckleberry
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 18,
            color: '#C1121F',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginTop: 16,
            fontFamily: 'monospace',
          }}
        >
          Cybersecurity Analyst · SOC · IAM
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Playfair Display', data: playfair, weight: 700 as const }],
    }
  )
}
