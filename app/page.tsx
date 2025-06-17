"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Globe, DollarSign } from "lucide-react"
import { generateReceiptHTML } from "@/lib/receipt-generator"
import { DiscordWidget, YouTubeWidget } from "@/components/social-widgets"
import { socialConfig } from "@/config/social"

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    recipient: "",
    currency: "EUR",
    lang: "en",
    transactionType: "Payment",
  })

  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerate = async () => {
    if (!formData.name || !formData.email || !formData.amount || !formData.recipient) {
      alert("Por favor, completa todos los campos requeridos")
      return
    }

    setIsGenerating(true)

    try {
      const htmlContent = generateReceiptHTML({
        name: formData.name,
        email: formData.email,
        amount: Number.parseFloat(formData.amount),
        recipient: formData.recipient,
        currency: formData.currency,
        lang: formData.lang,
        transactionType: formData.transactionType,
      })

      // Create and download the HTML file
      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      // Download the file
      const a = document.createElement("a")
      a.href = url
      a.download = `paypal_receipt_${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // Open in new tab
      const newWindow = window.open()
      if (newWindow) {
        newWindow.document.write(htmlContent)
        newWindow.document.close()
      }

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating receipt:", error)
      alert("Error al generar el recibo")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">PayPal Receipt Generator By Stivion</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Genera Recibos de PayPal By Stivion</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Herramienta educativa para crear recibos simulados de PayPal con soporte multiidioma y multidivisa.
            </p>
          </div>

          {/* Social Widgets */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8 w-full max-w-4xl">
            <div className="flex-1">
              <DiscordWidget serverId={socialConfig.discord.serverId} serverName={socialConfig.discord.serverName} />
            </div>
            <div className="flex-1">
              <YouTubeWidget
                channelId={socialConfig.youtube.channelId}
                channelName={socialConfig.youtube.channelName}
                channelHandle={socialConfig.youtube.channelHandle}
              />
            </div>
          </div>

          {/* Form Card */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Detalles de la Transacción
              </CardTitle>
              <CardDescription>Completa los campos para generar tu recibo personalizado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Remitente *</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email del Remitente *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Destinatario *</Label>
                  <Input
                    id="recipient"
                    placeholder="Nombre del destinatario"
                    value={formData.recipient}
                    onChange={(e) => handleInputChange("recipient", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Cantidad *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="100.00"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="BRL">BRL (R$)</SelectItem>
                      <SelectItem value="EGP">EGP (ج.م)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={formData.lang} onValueChange={(value) => handleInputChange("lang", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="ar-eg">العربية (مصر)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              >
                {isGenerating ? (
                  <>Generando...</>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Generar Recibo
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/60 rounded-lg backdrop-blur-sm">
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Multiidioma</h3>
              <p className="text-sm text-gray-600">Soporte para inglés, portugués y árabe</p>
            </div>
            <div className="text-center p-6 bg-white/60 rounded-lg backdrop-blur-sm">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Multidivisa</h3>
              <p className="text-sm text-gray-600">EUR, USD, GBP, BRL y EGP</p>
            </div>
            <div className="text-center p-6 bg-white/60 rounded-lg backdrop-blur-sm">
              <FileText className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Educativo</h3>
              <p className="text-sm text-gray-600">Solo para fines educativos</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              <strong>AVISO:</strong> Esta herramienta es solo para fines educativos.
            </p>
            <p>Los recibos generados son simulados y no representan transacciones reales.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
