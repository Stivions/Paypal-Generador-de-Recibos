"use client"

import { useState, useEffect } from "react"
import { Users, Youtube, ExternalLink } from "lucide-react"

interface DiscordWidgetProps {
  serverId: string
  serverName?: string
}

interface YouTubeWidgetProps {
  channelId: string
  channelName?: string
  channelHandle?: string
}

export function DiscordWidget({ serverId, serverName = "Mi Server" }: DiscordWidgetProps) {
  const [memberCount, setMemberCount] = useState<number | null>(null)
  const [onlineCount, setOnlineCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Para Discord, usaremos el widget embed directamente
    // La API de Discord tiene restricciones CORS, así que mostraremos datos estáticos
    const simulateDiscordData = () => {
      // Simular datos mientras el widget real carga
      setOnlineCount(Math.floor(Math.random() * 50) + 10) // Entre 10-60 usuarios online
      setMemberCount(Math.floor(Math.random() * 200) + 100) // Entre 100-300 miembros
      setIsLoading(false)
    }

    // Simular carga de datos después de 1 segundo
    const timer = setTimeout(simulateDiscordData, 1000)

    return () => clearTimeout(timer)
  }, [serverId])

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg border shadow-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#5865F2] rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{serverName}</h3>
            <p className="text-sm text-gray-600">Únete a nuestra comunidad</p>
          </div>
        </div>
        <a
          href={`https://discord.gg/G3wWHXv8js`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5865F2] hover:text-[#4752C4] transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {!isLoading && (
        <div className="flex gap-4 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600">{onlineCount} en línea</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-gray-600">{memberCount} miembros</span>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex gap-4 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
            <span className="text-gray-400">Cargando...</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="bg-[#36393f] rounded-lg p-4 text-white text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 bg-[#5865F2] rounded-full flex items-center justify-center">
              <Users className="h-3 w-3 text-white" />
            </div>
            <span className="font-semibold">Discord Server</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">Únete a nuestra comunidad para obtener soporte y actualizaciones</p>
          <a
            href={`https://discord.gg/G3wWHXv8js`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Unirse al Discord
          </a>
        </div>
      </div>
    </div>
  )
}

export function YouTubeWidget({ channelId, channelName = "Mi Canal", channelHandle }: YouTubeWidgetProps) {
  const [subscriberCount, setSubscriberCount] = useState<string>("1.2K")
  const [videoCount, setVideoCount] = useState<string>("25")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos de YouTube
    const timer = setTimeout(() => {
      // Datos simulados - en producción podrías usar la YouTube API
      setSubscriberCount("1.2K")
      setVideoCount("25")
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [channelId])

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg border shadow-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center">
            <Youtube className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{channelName}</h3>
            <p className="text-sm text-gray-600">Suscríbete para más contenido</p>
          </div>
        </div>
        <a
          href={`https://youtube.com/@${channelHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF0000] hover:text-[#CC0000] transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {!isLoading && (
        <div className="flex gap-4 mb-3 text-sm text-gray-600">
          <span>{subscriberCount} suscriptores</span>
          <span>{videoCount} videos</span>
        </div>
      )}

      {isLoading && (
        <div className="flex gap-4 mb-3 text-sm">
          <span className="text-gray-400 animate-pulse">Cargando estadísticas...</span>
        </div>
      )}

      <div className="space-y-3">
        <div className="aspect-video bg-gradient-to-br from-red-100 to-red-50 rounded-lg overflow-hidden flex items-center justify-center border">
          <div className="text-center">
            <Youtube className="h-12 w-12 text-[#FF0000] mx-auto mb-2" />
            <p className="text-sm text-gray-600 font-medium">Canal de YouTube</p>
            <p className="text-xs text-gray-500">@{channelHandle}</p>
          </div>
        </div>
        <a
          href={`https://youtube.com/@${channelHandle}?sub_confirmation=1`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#FF0000] hover:bg-[#CC0000] text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Suscribirse
        </a>
      </div>
    </div>
  )
}
