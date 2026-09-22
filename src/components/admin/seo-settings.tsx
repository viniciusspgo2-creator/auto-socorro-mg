'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

type SettingsForm = {
  siteName: string
  siteUrl: string
  metaTitle: string
  metaDescription: string
  ogImage: string
  whatsappNumber: string
  whatsappMessage: string
  phoneDisplay: string
  phoneE164: string
  gaId: string
  gtmId: string
}

const EMPTY: SettingsForm = {
  siteName: 'Auto Socorro MG',
  siteUrl: '',
  metaTitle: '',
  metaDescription: '',
  ogImage: '/img/frota.webp',
  whatsappNumber: '',
  whatsappMessage: '',
  phoneDisplay: '',
  phoneE164: '',
  gaId: '',
  gtmId: '',
}

export function SeoSettings() {
  const [form, setForm] = useState<SettingsForm>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data.settings) {
          const s = data.settings
          setForm({
            siteName: s.siteName ?? '',
            siteUrl: s.siteUrl ?? '',
            metaTitle: s.metaTitle ?? '',
            metaDescription: s.metaDescription ?? '',
            ogImage: s.ogImage ?? '',
            whatsappNumber: s.whatsappNumber ?? '',
            whatsappMessage: s.whatsappMessage ?? '',
            phoneDisplay: s.phoneDisplay ?? '',
            phoneE164: s.phoneE164 ?? '',
            gaId: s.gaId ?? '',
            gtmId: s.gtmId ?? '',
          })
        }
      })
      .catch(() => toast.error('Erro ao carregar configurações.'))
      .finally(() => setLoading(false))
  }, [])

  function set<K extends keyof SettingsForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      toast.success('Configurações salvas. O site já reflete as mudanças.')
    } catch {
      toast.error('Erro ao salvar configurações.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Carregando…</p>
  }

  return (
    <form onSubmit={save} className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">SEO e site</h1>
        <p className="text-sm text-muted-foreground">
          Metadados, contato e integrações do Google.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Identidade do site</CardTitle>
          <CardDescription>Nome e endereço público (usado no sitemap e URLs canônicas).</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="siteName">Nome do site</Label>
            <Input id="siteName" value={form.siteName} onChange={(e) => set('siteName', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteUrl">URL do site (https://…)</Label>
            <Input
              id="siteUrl"
              placeholder="https://www.seudominio.com.br"
              value={form.siteUrl}
              onChange={(e) => set('siteUrl', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Configure após conhecer o domínio final na Vercel. Usado no canonical, Open Graph e sitemap.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">SEO — Meta tags</CardTitle>
          <CardDescription>Home page: título, descrição e imagem compartilhada.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta title (até ~60 caracteres)</Label>
            <Input id="metaTitle" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta description (até ~155 caracteres)</Label>
            <Textarea
              id="metaDescription"
              rows={2}
              value={form.metaDescription}
              onChange={(e) => set('metaDescription', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ogImage">Imagem Open Graph (caminho ou URL)</Label>
            <Input id="ogImage" value={form.ogImage} onChange={(e) => set('ogImage', e.target.value)} />
            <p className="text-xs text-muted-foreground">Padrão: /img/frota.webp</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contato (WhatsApp e telefone)</CardTitle>
          <CardDescription>Botões do site: header, hero, sobre, CTA final e rodapé.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp (só números, com DDI+DDD)</Label>
            <Input
              id="whatsappNumber"
              placeholder="5517996371352"
              value={form.whatsappNumber}
              onChange={(e) => set('whatsappNumber', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsappMessage">Mensagem inicial do WhatsApp</Label>
            <Input
              id="whatsappMessage"
              value={form.whatsappMessage}
              onChange={(e) => set('whatsappMessage', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneDisplay">Telefone exibido</Label>
            <Input
              id="phoneDisplay"
              placeholder="(17) 99637-1352"
              value={form.phoneDisplay}
              onChange={(e) => set('phoneDisplay', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneE164">Telefone no formato internacional</Label>
            <Input
              id="phoneE164"
              placeholder="+5517996371352"
              value={form.phoneE164}
              onChange={(e) => set('phoneE164', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Google Analytics / Tag Manager</CardTitle>
          <CardDescription>
            Cole os IDs para ativar o rastreamento. Deixe em branco para não carregar nenhum script.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="gaId">Google Analytics 4 (G-…)</Label>
            <Input id="gaId" placeholder="G-XXXXXXXXXX" value={form.gaId} onChange={(e) => set('gaId', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gtmId">Google Tag Manager (GTM-…)</Label>
            <Input id="gtmId" placeholder="GTM-XXXXXXX" value={form.gtmId} onChange={(e) => set('gtmId', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? 'Salvando…' : 'Salvar configurações'}
        </Button>
      </div>
    </form>
  )
}
