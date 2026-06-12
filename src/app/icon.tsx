import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
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
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: 'Playfair Display',
            letterSpacing: '-1px',
            lineHeight: 1,
          }}
        >
          DH
        </div>
        <div
          style={{
            width: 16,
            height: 2,
            background: '#C1121F',
            marginTop: 2,
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Playfair Display', data: playfair, weight: 700 as const }],
    }
  )
}
